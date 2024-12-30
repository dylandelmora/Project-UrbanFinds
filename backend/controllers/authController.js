const connection = require('../config/db_connection'); // Koneksi database
const bcrypt = require('bcrypt');

// Fungsi untuk Sign Up
exports.signUp = (req, res) => {
  const { customerName, customerEmail, customerPassword, customerPhone } = req.body;

  if (!customerName || !customerEmail || !customerPassword || !customerPhone) {
    return res.status(400).json({ message: 'Semua kolom wajib diisi.' });
  }

  const query = `
    INSERT INTO customers (customerName, customerEmail, customerPassword, customerPhone, created_at)
    VALUES (?, ?, ?, ?, NOW())
  `;

  // Hash password sebelum menyimpan
  bcrypt.hash(customerPassword, 10, (err, hashedPassword) => {
    if (err) {
      console.error('Error saat hashing password:', err.message);
      return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }

    connection.query(
      query,
      [customerName, customerEmail, hashedPassword, customerPhone],
      (err, result) => {
        if (err) {
          console.error('Gagal menyimpan data:', err.message);
          return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
        }
        res.status(201).json({ message: 'Registrasi berhasil!' });
      }
    );
  });
};

// Fungsi untuk Login
exports.login = (req, res) => {
  console.log('Request body:', req.body); 

  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'Email/Phone Number dan Password wajib diisi.' });
  }

  const query = `
    SELECT * FROM customers 
    WHERE customerEmail = ? OR customerPhone = ? OR customerName = ?
  `;

  connection.query(query, [identifier, identifier, identifier], async (err, results) => {
    if (err) {
      console.error('Error saat mencari pengguna:', err.message);
      return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    const user = results[0];

    const isPasswordValid = await bcrypt.compare(password, user.customerPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Password salah.' });
    }

    res.status(200).json({
      message: 'Login berhasil!',
      user: { id: user.customerID, name: user.customerName, email: user.customerEmail },
    });
  });
};

// Fungsi untuk Mendapatkan Venue
exports.getVenues = (req, res) => {
  const sql = `
    SELECT venueId, venueName, venueType, venueAddress, venueDescription, venueImage, 
           venueFacility, description, openTime, closeTime
    FROM venue
  `;
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error querying venues:', err);
      res.status(500).json({ message: 'Database query error' });
      return;
    }
    console.log('Query result:', result); 
    res.status(200).json(result);
  });
}  


const jwt = require('jsonwebtoken');

exports.addReservation = (req, res) => {
  const { reservationDate, reservationTime, customerId, venueId } = req.body;


  if (!reservationDate || !reservationTime || !customerId || !venueId) {
    return res.status(400).json({ message: 'Semua kolom wajib diisi.' });
  }

  const reservationDateTime = `${reservationDate} ${reservationTime}`;

  
  const checkQuery = `
    SELECT * 
    FROM reservation
    WHERE venueId = ?
      AND (
        TIMESTAMP(CONCAT(reservationDate, ' ', reservationTime)) 
        BETWEEN TIMESTAMP(?) - INTERVAL 1 HOUR 
            AND TIMESTAMP(?) + INTERVAL 1 HOUR
      )
  `;

  connection.query(checkQuery, [venueId, reservationDateTime, reservationDateTime], (err, results) => {
    if (err) {
      console.error('Error saat memeriksa reservasi:', err.message);
      return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }

    if (results.length > 0) {
      return res.status(409).json({
        message: 'Waktu reservasi sudah penuh. Pilih waktu lain dengan jarak minimal 1 jam.',
      });
    }

   
    const insertQuery = `
      INSERT INTO reservation (reservationDate, reservationTime, reservationStatus, customerId, venueId)
      VALUES (?, ?, 'Confirmed', ?, ?)
    `;

    connection.query(
      insertQuery,
      [reservationDate, reservationTime, customerId, venueId],
      (err, result) => {
        if (err) {
          console.error('Gagal menambahkan reservasi:', err.message);
          return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
        }

        res.status(201).json({ message: 'Reservasi berhasil ditambahkan.', reservationId: result.insertId });
      }
    );
  });
};


exports.getMenu = (req, res) => {
  const sql = `
    SELECT menuId, menuName, menuPrice, menuImage, ownerId
    FROM menu
  `;
  
  connection.query(sql, (err, result) => {
    if (err) {
      console.error('Error querying menu:', err);   
      return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }

    
    res.status(200).json(result);
  });
};

exports.addTransaction = (req, res) => {
  const { reservationId, customerId, transactionStatus, items } = req.body;

  // Validasi input
  if (!reservationId || !customerId || !transactionStatus || !items || items.length === 0) {
    return res.status(400).json({ message: 'Semua data wajib diisi.' });
  }

  // Hitung total quantity dan total amount
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0); // Total semua quantity
  const totalAmount = items.reduce((sum, item) => sum + item.menuPrice * item.quantity, 0); // Total semua harga

  // Query untuk menyimpan transaksi tunggal
  const insertQuery = `
    INSERT INTO transactions (reservationId, customerId, quantity, amount, transactionStatus, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, NOW(), NOW());
  `;

  // Eksekusi query
  connection.query(
    insertQuery,
    [reservationId, customerId, totalQuantity, totalAmount, transactionStatus],
    (err, result) => {
      if (err) {
        console.error('Error inserting transaction:', err.message);
        return res.status(500).json({ message: 'Failed to add transaction.' });
      }

      res.status(201).json({
        message: 'Transaction successfully added.',
        transactionId: result.insertId, 
      });
    }
  );
};





exports.getReservation = (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const query = `
  SELECT 
    r.reservationId, 
    r.reservationDate, 
    r.reservationTime, 
    r.reservationStatus, 
    r.venueId,  
    v.venueName, 
    v.venueImage, 
    v.venueDescription
  FROM reservation r
  JOIN venue v ON r.venueId = v.venueId
  WHERE r.customerId = ?
`;

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching reservations:', err);
      return res.status(500).json({ message: 'Database query error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No reservations found for this user.' });
    }

    res.status(200).json(results); 
  });
};



exports.getProfile = (req, res) => {
  const userId = req.query.userId; 

  const query = `
    SELECT customerName, customerEmail 
    FROM customers 
    WHERE customerID = ?
  `;
  
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching profile:', err);
      return res.status(500).json({ message: 'Database query error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(results[0]);
  });
};

exports.addReview = (req, res) => {
  const { customerId, venueId, rating, reviewDescription } = req.body;

  // Validasi input
  if (!customerId || !venueId || !rating) {
    return res.status(400).json({ message: 'Kolom customerId, venueId, dan rating wajib diisi.' });
  }

  if (typeof rating !== 'number' || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating harus berupa angka antara 1.0 hingga 5.0.' });
  }

  if (reviewDescription && reviewDescription.length > 255) {
    return res.status(400).json({ message: 'Review tidak boleh lebih dari 255 karakter.' });
  }

  const query = `
    INSERT INTO review (customerId, venueId, rating, reviewDescription)
    VALUES (?, ?, ?, ?)
  `;

  connection.query(query, [customerId, venueId, rating, reviewDescription || null], (err, result) => {
    if (err) {
      console.error('Error adding review:', err.message);
      return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }

    res.status(201).json({
      message: 'Review berhasil ditambahkan.',
      reviewId: result.insertId,
    });
  });
};


exports.getReviews = (req, res) => {
  const { venueId } = req.params;

  // Validasi input
  if (!venueId) {
    return res.status(400).json({ message: 'Venue ID wajib diisi.' });
  }

  const query = `
    SELECT 
      r.reviewId, 
      r.rating, 
      r.reviewDescription, 
      c.customerName
    FROM review r
    JOIN customers c ON r.customerId = c.customerID
    WHERE r.venueId = ?
    ORDER BY r.reviewId DESC
  `;

  connection.query(query, [venueId], (err, results) => {
    if (err) {
      console.error('Error fetching reviews:', err.message);
      return res.status(500).json({ message: 'Database query error' });
    }

    res.status(200).json(results);
  });
};






