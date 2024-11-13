import * as utils from '../utils/responseModel.js'; // Adjust this path as necessary

export function requireAuth(req, res, next) {
    const tempResponse = new utils.response()
    if (!req.parsedToken) {
        tempResponse
            .setSuccess(false)
            .setMessage("Access denied. Token is invalid or missing.")
        res.json(tempResponse)
    }
    else{
        next();
    }
}
