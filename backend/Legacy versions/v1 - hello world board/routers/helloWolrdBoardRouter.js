import express from 'express';
const router = express.Router();

import * as helloWorldBoardController from '../controller/helloWorldBoardController.js';
import * as utils from '../../../utils/responseModel.js';
import { parseArrayIds } from '../../../middleware/parseArrayIds.js'; // Import the middleware

// =============================
// User Routes
// =============================

router.get('/allUsersAllEntries', helloWorldBoardController.getAllUsersWithEntries); // New route: Get all users with their entry IDs
router.get('/users/all', helloWorldBoardController.getAllUsers); // Get all users
router.get('/users/:id', helloWorldBoardController.getUserByID); // Get user by ID
router.get('/users/:id/allEntries', helloWorldBoardController.getEntriesIdsByUserId); // Get all entries of a specific user
router.get('/users/many/:manyids', parseArrayIds, helloWorldBoardController.getManyUsersByID); // Get many users by IDs with middleware

// =============================
// Entry Routes
// =============================

router.get('/entries/all', helloWorldBoardController.getAllEntries); // Get all entries
router.get('/entries/many/:manyids', parseArrayIds, helloWorldBoardController.getEntriesByIds); // Get many entries by IDs with middleware
router.get('/entries/:id', helloWorldBoardController.getEntryByID); // Get entry by ID

// =============================
// Health Check Route
// =============================

router.get('/', (req, res) => {
    const tempResponse = new utils.response();

    tempResponse
        .setSuccess(true)
        .setMessage(true)
        .setMessage("Successfully connected to version V1 of the Hello World board controller.");

    res.json(tempResponse);
});

// Export the router
export default router;
