import express from 'express';
const router = express.Router();

import * as threadEntryController from '../controller/forumController.js';
import * as utils from '../utils/responseModel.js';


import { parseArrayIds } from '../middleware/parseArrayIds.js'; 
import { requireAuth } from '../middleware/requireAuth.js'

// =============================
// Thread Routes
// =============================

router.get('/threads/all', threadEntryController.getAllThreads); // Get all threads
router.get('/threads/:id', threadEntryController.getThreadByID); // Get thread by ID
router.get('/threads/many/:manyids', parseArrayIds, threadEntryController.getManyThreadsByID); // Get many threads by IDs with middleware
router.get('/threads/byUser/:userId', threadEntryController.getThreadsByUserID); // Get threads by user ID

// Protected: 
router.delete('/threads/:id/delete', requireAuth, threadEntryController.deleteThread) // Delete a thread
// router.delete('/threads/many/:manyids/delete', requireAuth, threadEntryController.deleteManyThread) // Delete many threads
router.post('/threads/create/', requireAuth, threadEntryController.createThread); // Create a new thread

// =============================
// Entry Routes
// =============================

router.get('/entries/all', threadEntryController.getAllEntries); // Get all entries
router.get('/entries/:id', threadEntryController.getEntryByID); // Get entry by ID
router.get('/entries/byUser/:userId', threadEntryController.getEntriesByUserID); // Get entries by user ID
router.get('/entries/byThread/:threadId', threadEntryController.getEntriesByThreadID); // Get entries by thread ID
router.get('/entries/many/:manyids', parseArrayIds, threadEntryController.getManyEntriesByID); // Get many entries by IDs with middleware

// Protected:
// router.delete('/entries/:id/delete', requireAuth, threadEntryController.deleteEntry) // Delete a entry
// router.delete('/entries/many/:manyids/delete', requireAuth, threadEntryController.deleteManyEntries) // Delete many entries
router.post('/entries/create/', requireAuth, threadEntryController.createEntry); // Create a new entry

// =============================
// Health Check Route
// =============================

router.all('/', (req, res) => {
    const tempResponse = new utils.response();

    tempResponse
        .setSuccess(true)
        .setMessage("Successfully connected to the Thread and Entry Controller.");

    res.json(tempResponse);
});

// Export the router
export default router;
