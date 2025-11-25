const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = './portfolio.json';

// جلب كل المنتجات
app.get('/api/portfolio', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) return res.status(500).json({ error: 'Error reading data' });
        res.json(JSON.parse(data));
    });
});

// إضافة منتج جديد
app.post('/api/portfolio', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) return res.status(500).json({ error: 'Error reading data' });
        let items = JSON.parse(data);
        const newItem = req.body;
        newItem.id = Date.now();
        items.push(newItem);
        fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), err => {
            if (err) return res.status(500).json({ error: 'Error saving data' });
            res.json(newItem);
        });
    });
});

// حذف منتج
app.delete('/api/portfolio/:id', (req, res) => {
    fs.readFile(DATA_FILE, (err, data) => {
        if (err) return res.status(500).json({ error: 'Error reading data' });
        let items = JSON.parse(data);
        items = items.filter(item => item.id != req.params.id);
        fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), err => {
            if (err) return res.status(500).json({ error: 'Error saving data' });
            res.json({ success: true });
        });
    });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
