import * as database from '../databases/helloWorldBoardDatabase.js';
import * as utils from '../../../utils/responseModel.js';

// Function to get a user by ID
export function getUserByID(req, res) {
    const response = new utils.response();
    response.setMessage("Failed to get user by ID.");

    const query = database.getUserById(req.params.id, (result, err) => {
        if (err || result === undefined) {
            response.setMessage("Couldn't find the user in the database.");
            console.log(err, 123);
        } else {
            response
                .setSuccess(true)
                .setData(result)
                .setMessage("Successfully got the user data by ID.");
        }
        res.json(response);
    });
}

// Function to get all users
export function getAllUsers(req, res) {
    const response = new utils.response();
    response.setMessage("Failed to get all users data.");

    const query = database.getAllUsers((result, err) => {
        if (err || result === undefined) {
            response.setMessage("Couldn't get all users data.");
            console.log(result, err, 123);
        } else {
            response
                .setSuccess(true)
                .setData({
                    users: result // Clear description of the data structure being returned
                })
                .setMessage("Successfully got all users.");
        }
        res.json(response);
    });
}

// Function to get all users along with IDs of all their entries
export function getAllUsersWithEntries(req, res) {
    const response = new utils.response();
    response.setMessage("Failed to get all users with their entries.");

    const query = database.getAllUsersWithEntries((result, err) => {
        if (err || result === undefined) {
            response.setMessage("Couldn't get users with their entries data.");
            console.log(result, err, 123);
        } else {
            response
                .setSuccess(true)
                .setData({
                    users: result // Clear description of the data structure being returned
                })
                .setMessage("Successfully got all users with their entries.");
        }
        res.json(response);
    });
}

// Function to get multiple users by IDs from the URL
export function getManyUsersByID(req, res) {
    const response = new utils.response();
    response.setMessage("Failed to get users by IDs.");

    // Parse the manyids parameter from the URL
    const ids = req.params.manyids.split(',').map(id => id.trim()); // Split by comma and trim whitespace

    if (ids.length === 0) {
        response.setMessage("Invalid or missing IDs.");
        return res.json(response);
    }

    const query = database.getUsersByIds(ids, (result, err) => {
        if (err || result === undefined) {
            response.setMessage("Couldn't get users with the specified IDs.");
            console.log(err, 123);
        } else {
            response
                .setSuccess(true)
                .setData({
                    users: result // Clear description of the data structure being returned
                })
                .setMessage("Successfully got users by IDs.");
        }
        res.json(response);
    });
}

// Function to get multiple entries based on an array of IDs
export function getEntriesByIds(req, res) {
    const response = new utils.response();
    response.setMessage("Failed to get entries by IDs.");

    const ids = req.ids; // Use the parsed IDs from the middleware
    if (!Array.isArray(ids) || ids.length === 0) {
        response.setMessage("Invalid or missing IDs.");
        return res.json(response);
    }

    const query = database.getEntriesByIds(ids, (result, err) => {
        if (err || result === undefined) {
            response.setMessage("Couldn't get entries with the specified IDs.");
            console.log(err, 123);
        } else {
            response
                .setSuccess(true)
                .setData({
                    entries: result // Clear description of the data structure being returned
                })
                .setMessage("Successfully got entries by IDs.");
        }
        res.json(response);
    });
}


// Function to get IDs of all entries of a user by their ID
export function getEntriesIdsByUserId(req, res) {
    const response = new utils.response();
    response.setMessage("Failed to get entries IDs by user ID.");

    const userId = req.params.id; // Expecting user ID from the route parameters
    const query = database.getEntriesIdsByUserId(userId, (result, err) => {
        if (err || result === undefined) {
            response.setMessage("Couldn't get entries IDs for the specified user.");
            console.log(err, 123);
        } else {
            response
                .setSuccess(true)
                .setData({
                    entries: result // Clear description of the data structure being returned
                })
                .setMessage("Successfully got entries IDs by user ID.");
        }
        res.json(response);
    });
}

// Function to get an entry by ID
export function getEntryByID(req, res) {
    const response = new utils.response();
    response.setMessage("Failed to get entry by ID.");

    const query = database.getEntryById(req.params.id, (result, err) => {
        if (err || result === undefined) {
            response.setMessage("Couldn't find the entry in the database.");
            console.log(err, 123);
        } else {
            response
                .setSuccess(true)
                .setData(result)
                .setMessage("Successfully got the entry data by ID.");
        }
        res.json(response);
    });
}

// Function to get all entries
export function getAllEntries(req, res) {
    const response = new utils.response();
    response.setMessage("Failed to get all entries data.");

    const query = database.getAllEntries((result, err) => {
        if (err || result === undefined) {
            response.setMessage("Couldn't get all entries data.");
            console.log(result, err, 123);
        } else {
            response
                .setSuccess(true)
                .setData({
                    entries: result // Clear description of the data structure being returned
                })
                .setMessage("Successfully got all entries.");
        }
        res.json(response);
    });
}
