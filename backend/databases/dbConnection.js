// dbConnection.js
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory name for the database path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new SQLite database connection
export const db = new sqlite3.Database(path.join(__dirname, '../database.sqlite'), (err) => {
    if (err) {
        console.error('Error opening database: ' + err.message);
    } else {
        console.log('Connected to the SQLite database');
        // Ensure the users table exists
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Error creating users table:', err.message);
            }
        });

        // Ensure the entries table exists
        db.run(`CREATE TABLE IF NOT EXISTS entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error('Error creating entries table:', err.message);
            }
        });
    }
});
