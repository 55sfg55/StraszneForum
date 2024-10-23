import express from 'express';
const router = express.Router();

import * as userController from '../controller/usersController.js'; // Adjust this import based on your structure
import * as utils from '../utils/responseModel.js';
import { parseArrayIds } from '../middleware/parseArrayIds.js'; // Import the middleware

// =============================
// User Routes
// =============================

router.get('/all', userController.getAllUsers); // Get all users
router.get('/:id', userController.getUserByID); // Get user by ID
router.get('/many/:manyids', parseArrayIds, userController.getManyUsersByID); // Get many users by IDs with middleware

// =============================
// Health Check Route
// =============================

router.get('/', (req, res) => {
    const tempResponse = new utils.response();
    
    tempResponse
        .setSuccess(true) // Ensure to use setSuccess here
        .setMessage("Successfully connected to the User Controller.");

    res.json(tempResponse);
});

// Export the router
export default router;
