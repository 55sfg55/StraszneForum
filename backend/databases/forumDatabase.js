// forumDatabase.js

import { db } from './dbConnection.js';

// Function to get a thread by ID with callback
export const getThreadById = (id, callback) => {
    console.log(`Fetching thread by ID: ${id}`);
    const sql = `SELECT * FROM threads WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error(`Error fetching thread with ID ${id}:`, err);
            return callback(null, err);
        }

        if (row) {
            console.log(`Thread fetched successfully:`, row);
        } else {
            console.log(`No thread found with ID: ${id}`);
        }

        callback(row, null);
    });
};

// Function to get all threads with callback
export const getAllThreads = (callback) => {
    console.log(`Fetching all threads`);
    const sql = `SELECT * FROM threads`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(`Error fetching all threads:`, err);
            return callback(null, err);
        }

        console.log(`Fetched ${rows.length} threads.`);
        callback(rows, null);
    });
};

// Function to get threads by multiple IDs
export const getThreadsByIds = (ids, callback) => {
    if (!Array.isArray(ids) || ids.length === 0) {
        console.error(`Invalid or missing thread IDs`);
        return callback([], new Error("Invalid or missing thread IDs"));
    }

    const sql = `SELECT * FROM threads WHERE id IN (${ids.map(() => '?').join(',')})`;
    db.all(sql, ids, (err, rows) => {
        if (err) {
            console.error(`Error fetching threads with IDs ${ids}:`, err);
            return callback(null, err);
        }

        console.log(`Fetched ${rows.length} threads with specified IDs.`);
        callback(rows, null);
    });
};

// Function to get threads by user ID
export const getThreadsByUserId = (userId, callback) => {
    console.log(`Fetching threads for user ID: ${userId}`);
    const sql = `SELECT * FROM threads WHERE userId = ?`;
    db.all(sql, [userId], (err, rows) => {
        if (err) {
            console.error(`Error fetching threads for user ID ${userId}:`, err);
            return callback(null, err);
        }

        console.log(`Fetched ${rows.length} threads for user ID ${userId}.`);
        callback(rows, null);
    });
};

// Function to create a new thread
export const createThread = (title, content, userId, callback) => {
    console.log(`Creating a new thread with title: ${title}`);
    const sql = `INSERT INTO threads (title, content, userId) VALUES (?, ?, ?)`;
    const params = [title, content, userId]; 

    db.run(sql, params, function (err) {
        if (err) {
            console.error(`Error creating thread:`, err);
            return callback(null, err);
        }

        console.log(`Thread created successfully with ID: ${this.lastID}`);
        callback({ id: this.lastID, title, content, userId }, null); 
    });
};

// Function to delete a thread
// export const deleteThread = (threadId, userId, callback) => {
//     console.log(`Deleting a thread with ID: ${threadId}`);
//     const sql = `INSERT INTO threads (title, content, userId) VALUES (?, ?, ?)`;
//     const params = [title, content, userId]; 

//     db.run(sql, params, function (err) {
//         if (err) {
//             console.error(`Error creating thread:`, err);
//             return callback(null, err);
//         }

//         console.log(`Thread delete successfully with ID: ${this.lastID}`);
//         callback({ id: this.lastID, title, content, userId }, null); 
//     });
// };

// Function to delete a thread based on its threadId and userId
export const deleteThread = (threadId, userId, callback) => {
    console.log(`Deleting a thread with ID: ${threadId} for user ID: ${userId}`);
    
    const sql = `DELETE FROM threads WHERE id = ? AND userId = ?`;
    const params = [threadId, userId]; // Provide threadId and userId as params for the query

    // Execute the query
    db.run(sql, params, function (err) {
        if (err) {
            console.error(`Error deleting thread:`, err);
            return callback(null, err); // Pass the error to the callback
        }

        // Check if a row was deleted (affectedRows can help check if the deletion was successful)
        if (this.changes === 0) {
            console.log(`No thread found with ID: ${threadId} for user ID: ${userId}`);
            return callback(null, new Error('No thread found or you do not have permission to delete.'));
        }

        console.log(`Thread deleted successfully with ID: ${threadId}`);
        callback({ threadId, userId }, null); // Return success with thread ID and user ID
    });
};



// Function to get entries by thread ID
export const getEntriesByThreadId = (threadId, callback) => {
    console.log(`Fetching entries for thread ID: ${threadId}`);
    const sql = `SELECT * FROM entries WHERE threadId = ?`;
    db.all(sql, [threadId], (err, rows) => {
        if (err) {
            console.error(`Error fetching entries for thread ID ${threadId}:`, err);
            return callback(null, err);
        }

        console.log(`Fetched ${rows.length} entries for thread ID ${threadId}.`);
        callback(rows, null);
    });
};

// Function to get entries by user ID
export const getEntriesByUserId = (userId, callback) => {
    console.log(`Fetching entries for user ID: ${userId}`);
    const sql = `SELECT * FROM entries WHERE userId = ?`; 
    db.all(sql, [userId], (err, rows) => {
        if (err) {
            console.error(`Error fetching entries for user ID ${userId}:`, err);
            return callback(null, err);
        }

        console.log(`Fetched ${rows.length} entries for user ID ${userId}.`);
        callback(rows, null);
    });
};

// Function to get an entry by ID with callback
export const getEntryById = (id, callback) => {
    console.log(`Fetching entry by ID: ${id}`);
    const sql = `SELECT * FROM entries WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error(`Error fetching entry with ID ${id}:`, err);
            return callback(null, err);
        }

        if (row) {
            console.log(`Entry fetched successfully:`, row);
        } else {
            console.log(`No entry found with ID: ${id}`);
        }

        callback(row, null);
    });
};

// Function to get all entries with callback
export const getAllEntries = (callback) => {
    console.log(`Fetching all entries`);
    const sql = `SELECT * FROM entries`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(`Error fetching all entries:`, err);
            return callback(null, err);
        }

        console.log(`Fetched ${rows.length} entries.`);
        callback(rows, null);
    });
};

// Function to create a new entry
export const createEntry = (title, content, userId, threadId, callback) => {
    console.log(`Creating a new entry with title: ${title}`);
    const sql = `INSERT INTO entries (title, content, userId, threadId) VALUES (?, ?, ?, ?)`;
    const params = [title, content, userId, threadId];

    db.run(sql, params, function (err) {
        if (err) {
            console.error(`Error creating entry:`, err);
            return callback(null, err);
        }

        console.log(`Entry created successfully with ID: ${this.lastID}`);
        callback({ id: this.lastID, title, content, userId, threadId }, null); 
    });
};

// Function to get multiple entries by an array of IDs
export const getEntriesByIds = (ids, callback) => {
    if (!Array.isArray(ids) || ids.length === 0) {
        console.error(`Invalid or missing entry IDs`);
        return callback([], new Error("Invalid or missing entry IDs"));
    }

    const sql = `SELECT * FROM entries WHERE id IN (${ids.map(() => '?').join(',')})`;
    db.all(sql, ids, (err, rows) => {
        if (err) {
            console.error(`Error fetching entries with IDs ${ids}:`, err);
            return callback(null, err);
        }

        console.log(`Fetched ${rows.length} entries with specified IDs.`);
        callback(rows, null);
    });
};
