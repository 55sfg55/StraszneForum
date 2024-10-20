import express from 'express';
const router = express.Router();

import * as sessionsController from '../controller/sessionController.js'

import * as utils from '../utils/responseModel.js'

router.post('/register/', sessionsController.register)
router.post('/login/', sessionsController.login)
router.post('/verifySession/', sessionsController.checkSession)

router.get('/', (req, res) => {
    const tempResponse = new utils.response()

    tempResponse
        .setMessage(true)
        .setMessage("Successfully connected to version 0 of the session controller.")
    
    res.json(tempResponse)
});

// Export the router
export default router;
