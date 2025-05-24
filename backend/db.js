import Database from 'better-sqlite3';

const db = new Database('backend/database.sqlite');

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT
  )
`);

export default db;