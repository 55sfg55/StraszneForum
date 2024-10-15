import express from 'express';
const router = express.Router();

import * as databaseController from '../../controller/v0/helloWorldControler.js'

import * as utils from '../../utils/v0/helloWorldUtils.js'

// Sample route: Get all users
router.get('/allUsersAllEntries', databaseController.getAllUsersAllEntries)

router.get('/users/:id/allEntries', databaseController.getAllEntriesOfUser)
router.get('/users/many/:manyids', databaseController.getManyUsersByID)
router.get('/users/:id', databaseController.getUserById);

router.post('/entries/postentry/', databaseController.postEntry);
router.delete('/entries/deleteentry/', databaseController.deleteEntry);
router.get('/entries/all/', databaseController.getAllEntries);
router.get('/entries/many/:manyids', databaseController.getManyEntriesByID);
router.get('/entries/:id', databaseController.getEntryById);

router.get('/', (req, res) => {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setAll(true, "Successfully connected to version 0 of the Hello World message board.")
    res.json(tempResponse.responseDef)
});

// Export the router
export default router;
