// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mysql'
});

connection.connect((err) => { 
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());

// Allow requests from all origins
app.use(cors());

// Route for fetching phone number based on Aadhaar number
app.get('/getPhoneNumber', (req, res) => {
  const { aadhaarNumber } = req.query;

  const query = `SELECT phone_number FROM users WHERE aadhaar_number = ?`;
  connection.query(query, [aadhaarNumber], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Phone number not found for the provided Aadhaar number' });
      return;
    }

    const phoneNumber = results[0].phone_number;
    res.json({ phoneNumber });
  });
});

// Route for adding a new user to the users table
app.post('/addUser', (req, res) => {
  const { aadhaarNumber, name, dob, phoneNumber } = req.body;

  // Perform basic input validation
  if (!aadhaarNumber || !name || !dob || !phoneNumber) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const query = `INSERT INTO users (aadhaar_number, name, dob, phone_number) VALUES (?, ?, ?, ?)`;
  connection.query(query, [aadhaarNumber, name, dob, phoneNumber], (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.status(201).json({ message: 'User added successfully' });
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
