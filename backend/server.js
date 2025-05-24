import express from 'express';
import cors from 'cors';
import db from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Get all items
app.get('/api/items', (req, res) => {
  const items = db.prepare('SELECT * FROM items').all();
  res.json(items);
});

// Create an item
app.post('/api/items', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const stmt = db.prepare('INSERT INTO items (title, description) VALUES (?, ?)');
  const info = stmt.run(title, description);
  res.json({ id: info.lastInsertRowid, title, description });
});

// Update an item
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const stmt = db.prepare('UPDATE items SET title = ?, description = ? WHERE id = ?');
  const info = stmt.run(title, description, id);
  if (info.changes === 0) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json({ id, title, description });
});

// Delete an item
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('DELETE FROM items WHERE id = ?');
  const info = stmt.run(id);
  if (info.changes === 0) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json({ message: 'Item deleted' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});