import { db } from './dbConnection.js'; // Import the database connection

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

// Function to get multiple users’ data based on an array of IDs
export const getUsersByIds = (ids, callback) => {
    if (!Array.isArray(ids) || ids.length === 0) {
        console.error(`Invalid or missing user IDs`); // Log the error
        return callback([], new Error("Invalid or missing user IDs")); // Return empty array and error
    }

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