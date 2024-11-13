import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'database.sqlite');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const promptAndDeleteFile = () => {
    rl.question('The database file already exists. Do you want to delete it? (yes/no): ', (answer) => {
        if (answer.toLowerCase() === 'yes') {
            fs.unlink(dbPath, (err) => {
                if (err) {
                    console.error('Error deleting the database file:', err.message);
                } else {
                    console.log('Database file deleted.');
                }
                rl.close();
                setupDatabase();
            });
        } else {
            console.log('Database file not deleted.');
            rl.close();
            setupDatabase();
        }
    });
};

const setupDatabase = () => {
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error opening database: ' + err.message);
        } else {
            console.log('Connected to the SQLite database.');
        }
    });

    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            lastLogOut INTEGER
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS threads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            userId INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users (id)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            threadId INTEGER,
            userId INTEGER,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (threadId) REFERENCES threads (id),
            FOREIGN KEY (userId) REFERENCES users (id)
        )`);

        const users = [
            { username: "admin", password: "1234", lastLogOut: Math.floor(Date.now() / 1000) },
            { username: "admin2", password: "abcd", lastLogOut: Math.floor(Date.now() / 1000) - 3600 }
        ];
        const userStmt = db.prepare("INSERT INTO users (username, password, lastLogOut) VALUES (?, ?, ?)");

        users.forEach(user => {
            userStmt.run(user.username, user.password, user.lastLogOut, (err) => {
                if (err) {
                    console.error('Error inserting user:', err.message);
                }
            });
        });
        userStmt.finalize();

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

        const entries = [
            { threadId: 1, userId: 1, title: "First by admin", content: "Entry in first thread by admin." },
            { threadId: 1, userId: 2, title: "First by admin2", content: "Entry in first thread by admin2." },
            { threadId: 2, userId: 1, title: "Second by admin", content: "Entry in second thread by admin." },
            { threadId: 2, userId: 2, title: "Second by admin2", content: "Entry in second thread by admin2." }
        ];
        const entryStmt = db.prepare("INSERT INTO entries (threadId, userId, title, content) VALUES (?, ?, ?, ?)");

        entries.forEach(entry => {
            entryStmt.run(entry.threadId, entry.userId, entry.title, entry.content, (err) => {
                if (err) {
                    console.error('Error inserting entry:', err.message);
                }
            });
        });
        entryStmt.finalize();

        console.log('Database setup complete.');
    });

    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');
        }
    });
};

fs.access(dbPath, fs.constants.F_OK, (err) => {
    if (err) {
        console.log('Database file does not exist, proceeding to setup.');
        setupDatabase();
    } else {
        promptAndDeleteFile();
    }
});
