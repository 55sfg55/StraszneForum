// userRoutes.js
import express from 'express';
const router = express.Router();

import * as databaseController from '../controller/helloWorldControler.js'

import * as utils from '../utils/helloWorldUtils.js'

// Sample route: Get all users
router.get('/allUsersAllEntries', databaseController.getAllUsersAllEntries)
router.get('/user/login/', databaseController.login)
router.get('/user/checkSession/', databaseController.checkSession)
router.get('/user/register/', databaseController.register)
router.get('/user/:id', databaseController.getUser);
router.get('/entry/:id', databaseController.getEntryById);

router.get('/', (req, res) => {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setAll(true, "Successfully connected to version 0 of the Hello World message board.")
    res.json(tempResponse.responseDef)
});

// Export the router
export default router;
