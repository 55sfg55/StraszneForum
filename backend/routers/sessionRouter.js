import express from 'express';
const router = express.Router();

import * as sessionsController from '../controller/sessionController.js'

import * as utils from '../utils/responseModel.js'


import { requireAuth } from '../middleware/requireAuth.js'


router.post('/register/', sessionsController.register)
router.post('/login/', sessionsController.login)
router.post('/verifySession/', requireAuth, sessionsController.checkSession)

// Protected:
router.post('/logout/', requireAuth, sessionsController.logout)

router.get('/', (req, res) => {
    const tempResponse = new utils.response()

    tempResponse
        .setSuccess(true)
        .setMessage("Successfully connected to version V0 of the session controller.")
    
    res.json(tempResponse)
});

// Export the router
export default router;
