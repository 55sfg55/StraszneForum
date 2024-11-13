import { db } from './dbConnection.js'; // Import the database connection
import bcrypt from 'bcrypt'; // Import bcrypt for hashing
import jwt from "jsonwebtoken";

import * as jwtAuth from '../utils/jwtAuth.js'

console.log(
    jwt
)

const SALT_ROUNDS = 10; 

export function checkSessionByToken(argToken) {
    console.log(`Checking session by token: ${JSON.stringify(argToken)}`);

    // Assuming argToken has the structure { exp: ..., userId: ... }
    const decodedToken = argToken;  // Since the token is already decoded and passed
    const userId = decodedToken.userId;
    const tokenIat = decodedToken.iat;

    // Return a Promise to handle async operations properly
    return new Promise((resolve, reject) => {
        // Fetch LastLogOut from the users table for the userId
        const sql = `SELECT lastLogOut FROM users WHERE id = ?`;

        db.get(sql, [userId], (err, user) => {
            if (err) {
                console.error('Error fetching user data:', err);
                return reject(false);  // Reject promise if error occurs
            }

            if (!user) {
                console.log(`User with ID ${userId} not found.`);
                return reject(false);  // Reject promise if user not found
            }

            const lastLogOut = user.lastLogOut;

            // console.log("AND HERE", tokenIat, lastLogOut, user);

            // Check if the token is expired based on the exp field or lastLogOut
            // console.log( global.SERVER_START, tokenIat )
            console.log((tokenIat > lastLogOut), tokenIat, lastLogOut)
            console.log(( lastLogOut === null))
            console.log((tokenIat > lastLogOut || lastLogOut === null))
            console.log( ( tokenIat > global.SERVER_START ))
            if ( (tokenIat > lastLogOut || lastLogOut === null) && ( tokenIat > global.SERVER_START ) ) {
                console.log(`Session valid for token: ${JSON.stringify(argToken)}`);
                resolve({ userID: userId });  // Resolve promise if session is valid
            } else {
                console.log(`Session expired for token: ${JSON.stringify(argToken)}`);
                reject(false);  // Reject promise if session is expired
            }
        });
    });
}


export function stopSessionByUserID(argID) {
    const currentTimestamp = Date.now() / 1000;  // Current timestamp in milliseconds
    const sql = `UPDATE users SET lastLogOut = ? WHERE id = ?`;

    db.run(sql, [currentTimestamp, argID], (err) => {
        if (err) {
            console.error("Error updating lastLogOut:", err);
        } else {
            console.log(`Successfully updated lastLogOut timestamp for user ID: ${argID}`);
        }
    });
}


export function checkPassword(argId, argPassword, callback) {
    const sql = `SELECT * FROM users WHERE id = ?`;
    console.log(`Checking password for user ID: ${argId}`);
    db.get(sql, [argId], (err, user) => {
        if (err) {
            console.error("Error checking password:", err); 
            return callback(false); 
        }
        if (!user) {
            console.log("User not found.");
            return callback(false); 
        }

        bcrypt.compare(argPassword, user.password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err); 
                return callback(false);
            }
            console.log(isMatch ? "Password check successful." : "Password incorrect.");
            callback(isMatch); 
        });
    });
}

export function checkPasswordByUsername(argUsername, argPassword, callback) {
    const sql = `SELECT * FROM users WHERE username = ?`;
    console.log(`Checking password for username: ${argUsername}`);
    db.get(sql, [argUsername], (err, user) => {
        if (err) {
            console.error("Error checking password by username:", err); 
            return callback(false); 
        }
        if (!user) {
            console.log("Username not found.");
            return callback(false); 
        }

        
        bcrypt.compare(argPassword, user.password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err); 
                return callback(false);
            }
            console.log(isMatch ? "Password check by username successful." : "Password incorrect.");
            callback(isMatch); 
        });
    });
}

export function register(argUsername, argPassword, callback) {
    const checkSql = `SELECT * FROM users WHERE username = ?`;
    console.log(`Checking if username exists: ${argUsername}`);
    db.get(checkSql, [argUsername], (err, user) => {
        if (err) {
            console.error("Error checking for existing username:", err); 
            return callback(false); 
        }
        if (!user) {
            // Hash the password before inserting
            bcrypt.hash(argPassword, SALT_ROUNDS, (err, hashedPassword) => {
                if (err) {
                    console.error("Error hashing password:", err); 
                    return callback(false); 
                }

                const insertSql = `INSERT INTO users (username, password) VALUES (?, ?)`;
                console.log(`Inserting new user: ${argUsername}`);
                db.run(insertSql, [argUsername, hashedPassword], function (err) {
                    if (err) {
                        console.error("Error inserting user:", err); 
                        return callback(false); 
                    }
                    console.log("User registered successfully.");
                    callback(true); 
                });
            });
        } else {
            console.log("Username already exists.");
            callback(false); 
        }
    });
}

export function loginByUsername(argUsername, argPassword, callback) {
    const sql = `SELECT * FROM users WHERE username = ?`;
    console.log(`Logging in user: ${argUsername}`);
    db.get(sql, [argUsername], (err, user) => {
        if (err || !user) {
            console.error("Login failed:", err || "User not found");
            return callback({ isPasswordCorrect: false, token: "" });
        }


        bcrypt.compare(argPassword, user.password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return callback({ isPasswordCorrect: false, token: "" });
            }
            if (!isMatch) {
                console.log("Password incorrect.");
                return callback({ isPasswordCorrect: false, token: "" });
            }

            const token = jwtAuth.signLoginToken( user.id )

            console.log("Login successful, generated token:", token);
            callback({ isPasswordCorrect: true, token });
        });
    });
}

// export function debugLogPasswords() {
//     const sql = `SELECT username, password FROM users`; // SQL query to retrieve usernames and passwords

//     db.all(sql, [], (err, rows) => {
//         if (err) {
//             console.error("Error fetching passwords:", err); // Log error if any
//             return;
//         }

//         console.log("Debugging passwords in the database:");
//         rows.forEach((row) => {
//             console.log(`Username: ${row.username}, Hashed Password: ${row.password}`); // Log each username and hashed password
//         });
//     });
// }

// debugLogPasswords(); // Call the function to log passwords


