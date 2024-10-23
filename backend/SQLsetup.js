import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory name for the database path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new database (this will create 'database.sqlite' in your project directory)
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'), (err) => {
    if (err) {
        console.error('Error opening database: ' + err.message);
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

    // Create threads table with content field
    db.run(`CREATE TABLE IF NOT EXISTS threads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,  -- Ensure this field exists
        userId INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users (id)
    )`);

    // Create entries table
    db.run(`CREATE TABLE IF NOT EXISTS entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        threadId INTEGER,
        userId INTEGER,
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (threadId) REFERENCES threads (id),
        FOREIGN KEY (userId) REFERENCES users (id)
    )`);

    // Insert users
    const users = [
        { username: "admin", password: "1234" },
        { username: "admin2", password: "abcd" }
    ];
    const userStmt = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");

    users.forEach(user => {
        userStmt.run(user.username, user.password, (err) => {
            if (err) {
                console.error('Error inserting user:', err.message);
            }
        });
    });
    userStmt.finalize();

    // Insert threads
    const threads = [
        { title: "First Thread", content: "This is the content of the first thread.", userId: 1 },
        { title: "Second Thread", content: "This is the content of the second thread.", userId: 2 }
    ];
    const threadStmt = db.prepare("INSERT INTO threads (title, content, userId) VALUES (?, ?, ?)");

    threads.forEach(thread => {
        threadStmt.run(thread.title, thread.content, thread.userId, (err) => {
            if (err) {
                console.error('Error inserting thread:', err.message);
            }
        });
    });
    threadStmt.finalize();

    // Insert entries
    const entries = [
        { threadId: 1, userId: 1, content: "Entry in first thread by admin." },
        { threadId: 1, userId: 2, content: "Entry in first thread by admin2." },
        { threadId: 2, userId: 1, content: "Entry in second thread by admin." },
        { threadId: 2, userId: 2, content: "Entry in second thread by admin2." }
    ];
    const entryStmt = db.prepare("INSERT INTO entries (threadId, userId, content) VALUES (?, ?, ?)");

    entries.forEach(entry => {
        entryStmt.run(entry.threadId, entry.userId, entry.content, (err) => {
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
