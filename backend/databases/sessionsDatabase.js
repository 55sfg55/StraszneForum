import { db } from './dbConnection.js'; // Import the database connection
import bcrypt from 'bcrypt'; // Import bcrypt for hashing
import jwt from "jsonwebtoken";

console.log(
    jwt
)

const SALT_ROUNDS = 10; // Number of salt rounds for hashing

function generateRandomKey(username) {
    // Simple hash function to convert the username to a numeric value
    function hashString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }

    // Get a hash value from the username
    const hashValue = hashString(username);

    // Get the current timestamp
    const timestamp = Date.now();

    // Generate a random string based on the hash value and timestamp
    const randomChars = (hashValue + timestamp)
        .toString(36) // Convert to base-36 to get a mix of alphanumeric characters
        .substring(0, 24); // Get the first 24 characters for the random string

    // Create the final random key
    const randomKey = `${randomChars}-${timestamp}`;

    return randomKey;
}

let sessions = [];
const sessionTime = 1000 * 60 * 10; // 10 minutes

// Session cleaning, every 10 seconds
setInterval(() => {
    clearSessions();
}, 1000 * 10);

function addSession(argID, argToken) {
    console.log(`Adding session for user ID: ${argID} with token: ${argToken}`);
    sessions.push({
        userID: argID,
        token: argToken,
        exp: Date.now() + sessionTime
    });
}

function checkSessionByUserID(argID) {
    console.log(`Checking session by user ID: ${argID}`);
    const query = sessions.find(session => session.userID === argID);
    if (query !== undefined) {
        if (query.exp > Date.now()) {
            console.log(`Session valid for user ID: ${argID}`);
            return { userID: query.userID };
        }
        console.log(`Session expired for user ID: ${argID}, stopping session.`);
        stopSessionByUserID(argID);
        return false;
    }
    console.log(`No session found for user ID: ${argID}`);
    return false;
}

export function checkSessionByToken(argToken) {
    console.log(`Checking session by token: ${argToken}`);
    const query = sessions.find(session => session.token === String(argToken));
    if (query === undefined) {
        console.log(`No session found for token: ${argToken}`);
        return false;
    } else {
        if (query.exp > Date.now()) {
            console.log(`Session valid for token: ${argToken}`);
            return { userID: query.userID };
        }
        console.log(`Session expired for token: ${argToken}, stopping session.`);
        stopSessionByUserToken(argToken);
        return false;
    }
}

function stopSessionByUserID(argID) {
    console.log(`Stopping session for user ID: ${argID}`);
    sessions = sessions.filter(session => session.userID !== argID);
}

function stopSessionByUserToken(argToken) {
    console.log(`Stopping session for token: ${argToken}`);
    sessions = sessions.filter(session => session.token !== argToken);
}

function clearSessions() {
    console.log(`Clearing expired sessions.`);
    sessions = sessions.filter(session => session.exp > Date.now());
}

export function checkPassword(argId, argPassword, callback) {
    const sql = `SELECT * FROM users WHERE id = ?`;
    console.log(`Checking password for user ID: ${argId}`);
    db.get(sql, [argId], (err, user) => {
        if (err) {
            console.error("Error checking password:", err); // Log the error
            return callback(false); // Return false on error
        }
        if (!user) {
            console.log("User not found.");
            return callback(false); // Return false if not found
        }

        // Compare the hashed password
        bcrypt.compare(argPassword, user.password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err); // Log the error
                return callback(false);
            }
            console.log(isMatch ? "Password check successful." : "Password incorrect.");
            callback(isMatch); // Return the result of the comparison
        });
    });
}

export function checkPasswordByUsername(argUsername, argPassword, callback) {
    const sql = `SELECT * FROM users WHERE username = ?`;
    console.log(`Checking password for username: ${argUsername}`);
    db.get(sql, [argUsername], (err, user) => {
        if (err) {
            console.error("Error checking password by username:", err); // Log the error
            return callback(false); // Return false on error
        }
        if (!user) {
            console.log("Username not found.");
            return callback(false); // Return false if not found
        }

        // Compare the hashed password
        bcrypt.compare(argPassword, user.password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err); // Log the error
                return callback(false);
            }
            console.log(isMatch ? "Password check by username successful." : "Password incorrect.");
            callback(isMatch); // Return the result of the comparison
        });
    });
}

export function register(argUsername, argPassword, callback) {
    const checkSql = `SELECT * FROM users WHERE username = ?`;
    console.log(`Checking if username exists: ${argUsername}`);
    db.get(checkSql, [argUsername], (err, user) => {
        if (err) {
            console.error("Error checking for existing username:", err); // Log the error
            return callback(false); // Handle error if needed
        }
        if (!user) {
            // Hash the password before inserting
            bcrypt.hash(argPassword, SALT_ROUNDS, (err, hashedPassword) => {
                if (err) {
                    console.error("Error hashing password:", err); // Log the error
                    return callback(false); // Handle error if needed
                }

                const insertSql = `INSERT INTO users (username, password) VALUES (?, ?)`;
                console.log(`Inserting new user: ${argUsername}`);
                db.run(insertSql, [argUsername, hashedPassword], function (err) {
                    if (err) {
                        console.error("Error inserting user:", err); // Log the error
                        return callback(false); // Handle error if needed
                    }
                    console.log("User registered successfully.");
                    callback(true); // User registered successfully
                });
            });
        } else {
            console.log("Username already exists.");
            callback(false); // Username already exists
        }
    });
}

export function loginByUsername(argUsername, argPassword, callback) {
    const sql = `SELECT * FROM users WHERE username = ?`;
    console.log(`Logging in user: ${argUsername}`);
    db.get(sql, [argUsername], (err, user) => {
        if (err || !user) {
            console.error("Login failed:", err || "User not found"); // Log the error
            return callback({ isPasswordCorrect: false, token: "" }); // Return false on error or not found
        }

        // Compare the hashed password
        bcrypt.compare(argPassword, user.password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err); // Log the error
                return callback({ isPasswordCorrect: false, token: "" });
            }
            if (!isMatch) {
                console.log("Password incorrect.");
                return callback({ isPasswordCorrect: false, token: "" });
            }

            stopSessionByUserID(user.id); // Clear any existing sessions

            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                userId: user.id
              }, 'secret');; // Generate a new token

            addSession(user.id, token); // Add new session

            console.log("Login successful, generated token:", token);
            callback({ isPasswordCorrect: true, token }); // Return success with token
        });
    });
}











// // Function to update existing plaintext passwords to hashed passwords
// export function hashExistingPasswords() {
//     const sql = `SELECT id, username, password FROM users`; // Query to get all users

//     db.all(sql, [], (err, users) => {
//         if (err) {
//             console.error("Error fetching users:", err);
//             return;
//         }

//         // Loop through users and hash their passwords
//         users.forEach(user => {
//             bcrypt.hash(user.password, SALT_ROUNDS, (err, hashedPassword) => {
//                 if (err) {
//                     console.error(`Error hashing password for user ${user.username}:`, err);
//                     return;
//                 }

//                 // Update the user's password with the hashed password
//                 const updateSql = `UPDATE users SET password = ? WHERE id = ?`;
//                 db.run(updateSql, [hashedPassword, user.id], function(err) {
//                     if (err) {
//                         console.error(`Error updating password for user ${user.username}:`, err);
//                     } else {
//                         console.log(`Password for user ${user.username} updated successfully.`);
//                     }
//                 });
//             });
//         });
//     });
// }

// // Call this function to update existing passwords
// hashExistingPasswords();

export function debugLogPasswords() {
    const sql = `SELECT username, password FROM users`; // SQL query to retrieve usernames and passwords

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Error fetching passwords:", err); // Log error if any
            return;
        }

        console.log("Debugging passwords in the database:");
        rows.forEach((row) => {
            console.log(`Username: ${row.username}, Hashed Password: ${row.password}`); // Log each username and hashed password
        });
    });
}

debugLogPasswords(); // Call the function to log passwords


