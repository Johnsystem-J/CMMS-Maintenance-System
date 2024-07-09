require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MSSQL Configuration
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER, // คุณสามารถใช้ 'IP ของไดรฟ์กลาง' หรือ 'ชื่อโฮสต์ของไดรฟ์กลาง'
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true, // Use this if you're on Windows Azure
        trustServerCertificate: true // Change to true for local dev / self-signed certs
    }
};

// Connect to MSSQL
sql.connect(config).then(pool => {
    console.log('Connected to MSSQL');
    
    // POST endpoint to save project
    app.post('/api/projects', async (req, res) => {
        try {
            const { startDate, endDate } = req.body;
            const result = await pool.request()
                .input('startDate', sql.NVarChar, startDate)
                .input('endDate', sql.NVarChar, endDate)
                .query('INSERT INTO Projects (StartDate, EndDate) VALUES (@startDate, @endDate)');
            
            res.status(201).send({ success: true, result });
        } catch (err) {
            console.error('SQL error', err);
            res.status(500).send({ success: false, message: err.message });
        }
    });

}).catch(err => {
    console.error('Database connection failed', err);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
