const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();


app.use(cors());
app.use(bodyParser.json()); 

// Koneksi ke MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",  
    password: "",  
    database: "urbanfinds", 
    port: 4306
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database!');
});


app.post('/register', (req, res) => {
    const { fullName, phoneNumber, email, password } = req.body;

   
    if (!fullName || !phoneNumber || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }


    const query = 'INSERT INTO users (full_name, phone_number, email, password) VALUES (?, ?, ?, ?)';
    db.query(query, [fullName, phoneNumber, email, password], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error while registering user' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });


app.listen(3000, () => {
    console.log('Server is running on port ');
});
