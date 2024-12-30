const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); 
const db = require('../config/db_connection'); 


router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.get('/venues', authController.getVenues);
router.get('/venue/:id', (req, res) => {
    const venueId = req.params.id; 
  
    const sql = 'SELECT * FROM venue WHERE venueId = ?'; 
    db.query(sql, [venueId], (err, result) => {
      if (err) {
        console.error('Error querying venue details:', err.message);
        return res.status(500).json({ message: 'Database query error' });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ message: 'Venue not found' });
      } 
  
      res.status(200).json(result[0]); 
    });
  });
  router.post('/reservation', authController.addReservation);
  router.get('/menu', authController.getMenu);
  router.post('/addReview', authController.addReview);
  router.get('/reviews/:venueId', authController.getReviews);
  router.get('/profile', authController.getProfile);
  router.get('/reservations/:userId', authController.getReservation);
  router.post('/addTransaction', authController.addTransaction);

  
  

module.exports = router;
