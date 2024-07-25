const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 1000;

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xyz@123',
    database: 'portfolio'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

// Middleware to serve static files
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());

// Route to handle form submission
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    let sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('Contact saved to database');
    });
});

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'public','index.html'));
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
