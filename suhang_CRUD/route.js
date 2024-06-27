// C
app.post('/naresha', (req, res) => {
    const { date1, date2, grade: thisgrade, class: thisclass, subject, place, title, content } = req.body;

    const sql = `INSERT INTO naresha (date1, date2, grade, class, subject, place, title, content) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [date1, date2, thisgrade, thisclass, subject, place, title, content];

    db.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).send('Error inserting data into database');
        } else {
            res.send('Data successfully inserted into database');
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
            res.status(500).send(`Error deleting data for ID ${id}`);
        } else {
            res.send(`Data deleted successfully for ID ${id}`);
        }
    });
});
