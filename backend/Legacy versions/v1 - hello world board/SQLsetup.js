import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory name for the database path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new database (this will create 'database.sqlite' in your project directory)
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'), (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Create tables and insert data
db.serialize(() => {
    // Create users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        password TEXT NOT NULL
    )`);

    // Create entries table
    db.run(`CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        content TEXT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users (id)
    )`);

    // Insert users
    let users = [
        { username: "admin", password: "1234" },
        { username: "admin2", password: "abcd" }
    ];
    let userStmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");

    users.forEach(user => {
        userStmt.run(user.username, user.password, (err) => {
            if (err) {
                console.error('Error inserting user:', err.message);
            }
        });
    });
    userStmt.finalize();

    // Insert entries
    let entries = [
        { userId: 1, content: "Wpis testowy - hardcoded" },
        { userId: 2, content: "Wpis testowy drugiego adminka - hardcoded" },
        { userId: 1, content: "wpis testowy nr. 2 pierwszego admina - hardcoded" },
        { userId: 2, content: "Wpis testowy nr.2 DRUGIEGO aminka - hardcoded" }
    ];
    let entryStmt = db.prepare("INSERT INTO entries (userId, content) VALUES (?, ?)");

    entries.forEach(entry => {
        entryStmt.run(entry.userId, entry.content, (err) => {
            if (err) {
                console.error('Error inserting entry:', err.message);
            }
        });
    });
    entryStmt.finalize();

    console.log('Database setup complete.');
});

// Close the database
db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('Database connection closed.');
    }
});
