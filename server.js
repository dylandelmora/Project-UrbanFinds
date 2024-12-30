var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

e
var con = mysql.createConnection({
  host: 'localhost',
  port: '4306',
  user: 'root',
  password: '',
  database: 'urbanfinds',
});


var server = app.listen(8086, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log(`Server running at http://${host}:${port}/`);
});


con.connect(function (error) {
  if (error) console.log(error);
  else console.log('Connected to database');
});


app.get('/customers', function (req, res) {
  con.query('SELECT * FROM customers', function (error, rows, fields) {
    if (error) {
      console.log(error);
      res.status(500).send('Error retrieving customers');
    } else {
      console.log(rows);
      res.send(rows);
    }
  });
});


app.get('/venues', function (req, res) {
  con.query(
    'SELECT venueId, venueName, venueType, venueAddress, venueDescription FROM venue',
    function (error, rows, fields) {
      if (error) {
        console.log(error);
        res.status(500).send('Error retrieving venues');
      } else {
        console.log(rows);
        res.send(rows);
      }
    }
  );
});
