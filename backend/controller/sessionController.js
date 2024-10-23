import * as database from '../databases/sessionsDatabase.js';
import * as utils from '../utils/responseModel.js';

// Session management requests:

export function login(req, res) {
    const tempResponse = new utils.response();
    tempResponse.setMessage("Failed to check password.");

    // Use the database function with a callback to handle asynchronous result
    database.loginByUsername(
        String(req.body.username),
        String(req.body.password),
        (result) => {
            if (result.isPasswordCorrect) {
                tempResponse
                    .setSuccess(true)
                    .setMessage("Password is correct. Successfully processed request.")
                    .setData({ token: result.token });
            } else {
                tempResponse
                    .setSuccess(false)
                    .setMessage("Password is incorrect. Successfully processed request.");
            }
            res.json(tempResponse);
        }
    );
}

export function register(req, res) {
    const tempResponse = new utils.response();
    tempResponse.setMessage("Failed to register.");

    // Use the database function with a callback to handle asynchronous result
    database.register(req.body.username, req.body.password, (success) => {
        if (success) {
            tempResponse
                .setSuccess(true)
                .setMessage("User was registered.");
        } else {
            tempResponse
                .setSuccess(false)
                .setMessage("User was not registered.");
        }
        res.json(tempResponse);
    });
}

export function checkSession(req, res) {
    const tempResponse = new utils.response();
    tempResponse.setMessage("Failed to check token.");

    // Use the database function with a callback to handle asynchronous result
    const result = database.checkSessionByToken(String(req.body.token));
    
    if (result) {
        tempResponse
            .setSuccess(true)
            .setMessage("Token is correct.");
    } else {
        tempResponse
            .setSuccess(false)
            .setMessage("Invalid token.");
    }
    res.json(tempResponse);
}
