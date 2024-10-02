// userRoutes.js
const express = require('express');
const router = express.Router();

const databaseController = require('../controller/helloWorldControler')

// Sample route: Get all users
router.get('/', databaseController.getAll);
router.get('/allUsersAllEntries', databaseController.getAllUsersAllEntries)
router.get('/user/:id', databaseController.getUser);
router.get('/entry/:id', databaseController.getEntryById);

// Sample route: Create a new user
router.post('/', (req, res) => {
    const newUser = req.body;
    res.status(201).send(`User created: ${JSON.stringify(newUser)}`);
});

// Export the router
module.exports = router;
