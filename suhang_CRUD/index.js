const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const port = process.env.PORT || 8184;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err.stack);
    throw err;
  }
  console.log('MySQL database connected!');
});

// C
app.post('/naresha', (req, res) => {
    const { date1, date2, grade: thisgrade, class: thisclass, subject, place, title, content } = req.body;

    const sql = `INSERT INTO naresha (date1, date2, grade, class, subject, place, title, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [date1, date2, thisgrade, thisclass, subject, place, title, content];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data into database:', err.stack);
            res.status(500).send('Error inserting data into database');
        } else {
            res.send('Data successfully inserted into database');
        }
    });
});

// R
app.get('/naresha/:id', (req, res) => {
    const { id } = req.params;

    db.query(`SELECT * FROM naresha WHERE id = ?`, [id], (err, result) => {
        if (err) {
            console.error(`Error retrieving data for ID ${id}:`, err.stack);
            res.status(500).send(`Error retrieving data for ID ${id}`);
        } else {
            res.json(result);
        }
    });
});

// U
app.put('/naresha/:id', (req, res) => {
    const { id } = req.params;
    const { date1, date2, grade: thisgrade, class: thisclass, subject, place, title, content } = req.body;

    const sql = `UPDATE naresha SET date1 = ?, date2 = ?, grade = ?, class = ?, subject = ?, place = ?, title = ?, content = ? WHERE id = ?`;
    const values = [date1, date2, thisgrade, thisclass, subject, place, title, content, id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(`Error updating data for ID ${id}:`, err.stack);
            res.status(500).send(`Error updating data for ID ${id}`);
        } else {
            res.send(`Data updated successfully for ID ${id}`);
        }
    });
});

// D
app.delete('/naresha/:id', (req, res) => {
    const { id } = req.params;

    db.query(`DELETE FROM naresha WHERE id = ?`, [id], (err, result) => {
        if (err) {
            console.error(`Error deleting data for ID ${id}:`, err.stack);
            res.status(500).send(`Error deleting data for ID ${id}`);
        } else {
            res.send(`Data deleted successfully for ID ${id}`);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
