// userRoutes.js
import express from 'express';
const router = express.Router();

import * as databaseController from '../controller/helloWorldControler.js'

// Sample route: Get all users
router.get('/', databaseController.getAll);
router.get('/allUsersAllEntries', databaseController.getAllUsersAllEntries)
router.get('/user/:id', databaseController.getUser);
router.get('/entry/:id', databaseController.getEntryById);
router.get('/user/login', databaseController.login)

// Sample route: Create a new user
router.post('/', (req, res) => {
    const newUser = req.body;
    res.status(201).send(`User created: ${JSON.stringify(newUser)}`);
});

// Export the router
export default router;
