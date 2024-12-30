const express = require('express');
const authRoutes = require('./routes/authRoutes');
const authController = require('./controllers/authController'); 
const mysql = require('mysql');
const path = require('path');




const app = express(); 

// Middleware untuk parsing JSON
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, '../assets')));





// Koneksi ke database
const db = mysql.createConnection({
  host: 'localhost',
  port: '4306', // Sesuaikan port dengan MySQL Anda
  user: 'root', // Sesuaikan dengan user MySQL Anda
  password: '', // Password MySQL Anda
  database: 'urbanfinds', // Nama database
});

// Cek koneksi database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Connected to the database.');
  }
});

// Gunakan rute autentikasi
app.use('/api/auth', authRoutes);

// Jalankan server
app.listen(4001, '0.0.0.0', () => {
  console.log('Server berjalan di http://192.168.1.8:4001');
});
