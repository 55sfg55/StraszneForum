// userRoutes.js
import express from 'express';
const router = express.Router();

import * as databaseController from '../controller/helloWorldControler.js'

import * as utils from '../utils/helloWorldUtils.js'

// Sample route: Get all users
router.get('/allUsersAllEntries', databaseController.getAllUsersAllEntries)
router.post('/users/register/', databaseController.register)
router.post('/users/login/', databaseController.login)
router.post('/users/checkSession/', databaseController.checkSession)
router.get('/users/:id/allEntries', databaseController.getAllEntriesOfUser)
router.get('/users/:id', databaseController.getUserById);
router.post('/entries/postentry/', databaseController.postEntry);
router.delete('/entries/deleteentry/', databaseController.deleteEntry);
router.get('/entries/all/', databaseController.getAllEntries);
router.get('/entries/:id', databaseController.getEntryById);

router.get('/', (req, res) => {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setAll(true, "Successfully connected to version 0 of the Hello World message board.")
    res.json(tempResponse.responseDef)
});

// Export the router
export default router;
