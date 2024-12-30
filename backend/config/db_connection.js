const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Sesuaikan dengan password database Anda
  database: 'urbanfinds', // Nama database Anda
  port: 4306, // Port MySQL Anda
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    throw err;
  }
  console.log('Connected to the database.');
});

module.exports = db; 
