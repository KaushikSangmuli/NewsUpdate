const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'Kaushik',
    password: 'Kaushik@123',
    database: 'signup_form'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL server.');
});

// Handle signup route
app.post('/signup', async (req, res) => {
    console.log('Received data:', req.body);
    const { userName, password, mobile } = req.body;
    console.log(userName,username)

    if (!userName || !password || !mobile) {
        return res.status(400).send('Missing required fields');
    }

    // Insert user data into the database
    const query = 'INSERT INTO users (username, password, mobile) VALUES (?, ?, ?)';
    db.query(query, [userName, password, mobile], (err, result) => {
a
        if (err) {
            console.log(userName)

            console.error('Error inserting data:', err);
            res.status(500).send('Server error');
            return;
        }
        res.status(200).send('User registered successfully');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
