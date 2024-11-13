import * as database from '../databases/sessionsDatabase.js';
import * as utils from '../utils/responseModel.js';

// Session management requests:

export function login(req, res) {
    const tempResponse = new utils.response();
    tempResponse.setMessage("Failed to check password.");

    // Use the database function with a callback to handle asynchronous result
    database.loginByUsername(String(req.body.username), String(req.body.password), (result) => {
        if (result.isPasswordCorrect) {
            tempResponse
                .setSuccess(true)
                .setMessage("Password is correct. Successfully processed request.")
                .setData({ token: result.token });

            console.log("Token generated:", result.token);  // Add this log to check if token is being generated.

            // Set the token in an HttpOnly cookie
            res.cookie('auth_token', result.token, {
                httpOnly: true,   // Makes the cookie accessible only by the server
                secure: true, // process.env.NODE_ENV === 'production', // Set 'secure' to true in production (HTTPS)
                maxAge: 24 * 60 * 60 * 1000,  // Optional: Cookie expiration (1 day)
                sameSite: 'none'  // Optional: Prevents the cookie from being sent with cross-site requests (Lax for dev)
            });

        } else {
            tempResponse
                .setSuccess(false)
                .setMessage("Password is incorrect.");
        }
        res.json(tempResponse);
    });
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



export async function checkSession(req, res) {
    const tempResponse = new utils.response();
    tempResponse.setMessage("Failed to check token.");

    // Get the token from the cookies, not from req.body
    const token = req.parsedToken;  // HttpOnly cookie automatically included in the request
    // console.log("test: ", req.parsedToken)

    if (!token) {
        tempResponse.setSuccess(false).setMessage("No token provided.");
        return res.json(tempResponse);
    }

    try {
        // Assuming checkSessionByToken is an async function that checks the token in the database
        // const result = database.checkSessionByToken(token);


        database.checkSessionByToken(req.parsedToken)
                .then(sessionData => {
                    tempResponse.setSuccess(true).setMessage("Token is correct.");
            
                    res.json(tempResponse);
                })
                .catch(err => {
                    tempResponse.setSuccess(false).setMessage("Invalid token.");
            
                    res.json(tempResponse);
                });

    } catch (error) {
        console.error("Error checking session:", error);
        tempResponse.setSuccess(false).setMessage("Error checking token.");
    }

    // tempResponse.setMessage(req.parsedToken)
    // res.json(tempResponse)
}

export function logout(req, res) {
    const tempResponse = new utils.response();

    // Ensure parsed token and userId are present
    if (!req.parsedToken) {
        tempResponse
            .setSuccess(false)
            .setMessage("No valid session found for logout.");
        return res.json(tempResponse);
    }

    const userId = req.parsedToken.userId;

    // Stop the session by updating lastLogOut for the user
    database.stopSessionByUserID(userId);

    tempResponse
        .setSuccess(true)
        .setMessage("User successfully logged out.");
    
    res.json(tempResponse);
}

