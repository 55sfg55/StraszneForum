import * as database from '../databases/usersDatabase.js'
import * as utils from '../utils/responseModel.js'; // Adjust this path as necessary

// Function to get a user by ID
export function getUserByID(req, res) {
    const response = new utils.response();
    response.setMessage("Failed to get user by ID.");

    database.getUserById(req.params.id, (result, err) => {
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

    database.getAllUsers((result, err) => {
        if (err || result === undefined) {
            response.setMessage("Couldn't get all users data.");
            console.log(err, 123);
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

    database.getUsersByIds(ids, (result, err) => {
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
