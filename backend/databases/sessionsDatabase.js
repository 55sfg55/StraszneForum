// Assuming `db` is your SQLite database connection
import { db } from './dbConnection.js'; // Import the database connection

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
    const query = sessions.find(session => session.token === argToken);
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

// Add token and session handler
export function checkPassword(argId, argPassword, callback) {
    const sql = `SELECT * FROM users WHERE id = ? AND password = ?`;
    console.log(`Checking password for user ID: ${argId}`);
    db.get(sql, [argId, argPassword], (err, user) => {
        if (err) {
            console.error("Error checking password:", err); // Log the error
            return callback(false); // Return false on error
        }
        if (!user) {
            console.log("User not found or password incorrect.");
            return callback(false); // Return false if not found
        }
        console.log("Password check successful.");
        callback(true); // Return true if user found
    });
}

export function checkPasswordByUsername(argUsername, argPassword, callback) {
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    console.log(`Checking password for username: ${argUsername}`);
    db.get(sql, [argUsername, argPassword], (err, user) => {
        if (err) {
            console.error("Error checking password by username:", err); // Log the error
            return callback(false); // Return false on error
        }
        if (!user) {
            console.log("Username not found or password incorrect.");
            return callback(false); // Return false if not found
        }
        console.log("Password check by username successful.");
        callback(true); // Return true if user found
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
            const insertSql = `INSERT INTO users (username, password) VALUES (?, ?)`;
            console.log(`Inserting new user: ${argUsername}`);
            db.run(insertSql, [argUsername, argPassword], function (err) {
                if (err) {
                    console.error("Error inserting user:", err); // Log the error
                    return callback(false); // Handle error if needed
                }
                console.log("User registered successfully.");
                callback(true); // User registered successfully
            });
        } else {
            console.log("Username already exists.");
            callback(false); // Username already exists
        }
    });
}

export function loginByUsername(argUsername, argPassword, callback) {
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    console.log(`Logging in user: ${argUsername}`);
    db.get(sql, [argUsername, argPassword], (err, user) => {
        if (err || !user) {
            console.error("Login failed:", err || "User not found"); // Log the error
            return callback({ isPasswordCorrect: false, token: "" }); // Return false on error or not found
        }

        stopSessionByUserID(user.id); // Clear any existing sessions

        const token = generateRandomKey(user.username); // Generate a new token

        addSession(user.id, token); // Add new session

        console.log("Login successful, generated token:", token);
        callback({ isPasswordCorrect: true, token }); // Return success with token
    });
}
