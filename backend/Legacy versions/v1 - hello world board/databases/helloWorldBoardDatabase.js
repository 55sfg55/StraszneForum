import { db } from '../../../databases/dbConnection.js' // Import the database connection

// Function to get a user by ID with callback
export const getUserById = (id, callback) => {
    console.log(`Fetching user by ID: ${id}`); // Debug log for fetching user
    const sql = `SELECT * FROM users WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error(`Error fetching user with ID ${id}:`, err); // Log the error
            return callback(null, err); // Return null for user data and error
        }

        // Remove the password before resolving
        if (row) {
            delete row.password; // Remove the password field from the user object
            console.log(`User fetched successfully:`, row); // Log fetched user
        } else {
            console.log(`No user found with ID: ${id}`); // Log if no user is found
        }

        callback(row, null); // Return the user row without the password and null for error
    });
};

// Function to get all users with callback
export const getAllUsers = (callback) => {
    console.log(`Fetching all users`); // Debug log for fetching all users
    const sql = `SELECT * FROM users`; // Query to select all users
    db.all(sql, [], (err, rows) => { // Use db.all to get multiple rows
        if (err) {
            console.error(`Error fetching all users:`, err); // Log the error
            return callback(null, err); // Return null for user data and error
        }

        // Remove passwords from all user rows
        rows.forEach((user) => {
            delete user.password; // Remove the password field from each user object
            console.log(`User fetched:`, user); // Log each fetched user
        });

        callback(rows, null); // Return the array of user rows without passwords and null for error
    });
};

// Function to get all users along with IDs of all their entries
export const getAllUsersWithEntries = (callback) => {
    const sql = `
        SELECT u.id AS userId, u.username, e.id AS entryId
        FROM users u
        LEFT JOIN entries e ON u.id = e.userId
    `;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(`Error fetching all users with entries:`, err);
            return callback(null, err);
        }

        const usersWithEntries = {};

        // Organize the result
        rows.forEach(({ userId, username, entryId }) => {
            if (!usersWithEntries[userId]) {
                usersWithEntries[userId] = {
                    username,
                    entries: []
                };
            }
            if (entryId) {
                usersWithEntries[userId].entries.push(entryId);
            }
        });

        callback(Object.values(usersWithEntries), null); // Return array of users with entries
    });
};

// Function to get multiple users’ data based on an array of IDs
export const getUsersByIds = (ids, callback) => {
    const sql = `SELECT * FROM users WHERE id IN (${ids.map(() => '?').join(',')})`;
    db.all(sql, ids, (err, rows) => {
        if (err) {
            console.error(`Error fetching users with IDs ${ids}:`, err);
            return callback(null, err);
        }

        // Remove passwords from the user rows
        rows.forEach((user) => {
            delete user.password; // Remove the password field from each user object
        });

        callback(rows, null); // Return array of users without passwords
    });
};

// Function to get multiple entries based on an array of IDs
export const getEntriesByIds = (ids, callback) => {
    const sql = `SELECT * FROM entries WHERE id IN (${ids.map(() => '?').join(',')})`;
    db.all(sql, ids, (err, rows) => {
        if (err) {
            console.error(`Error fetching entries with IDs ${ids}:`, err);
            return callback(null, err);
        }

        callback(rows, null); // Return array of entries
    });
};

// Function to get IDs of all entries of a user by their ID
export const getEntriesIdsByUserId = (userId, callback) => {
    const sql = `SELECT id FROM entries WHERE userId = ?`;
    db.all(sql, [userId], (err, rows) => {
        if (err) {
            console.error(`Error fetching entries for user ID ${userId}:`, err);
            return callback(null, err);
        }

        const entryIds = rows.map(row => row.id); // Extract IDs from the result
        callback(entryIds, null); // Return array of entry IDs
    });
};

// Function to get an entry by ID with callback
export const getEntryById = (id, callback) => {
    console.log(`Fetching entry by ID: ${id}`); // Debug log for fetching entry
    const sql = `SELECT * FROM entries WHERE id = ?`; // Change table name to 'entries'
    db.get(sql, [id], (err, row) => {
        if (err) {
            console.error(`Error fetching entry with ID ${id}:`, err); // Log the error
            return callback(null, err); // Return null for entry data and error
        }

        console.log(`Entry fetched successfully:`, row); // Log fetched entry
        callback(row, null); // Return the entry row without sensitive fields and null for error
    });
};

// Function to get all entries with callback
export const getAllEntries = (callback) => {
    console.log(`Fetching all entries`); // Debug log for fetching all entries
    const sql = `SELECT * FROM entries`; // Change table name to 'entries'
    db.all(sql, [], (err, rows) => { // Use db.all to get multiple rows
        if (err) {
            console.error(`Error fetching all entries:`, err); // Log the error
            return callback(null, err); // Return null for entries data and error
        }

        console.log(`Entries fetched successfully:`, rows); // Log fetched entries
        callback(rows, null); // Return the array of entry rows without sensitive fields and null for error
    });
};
