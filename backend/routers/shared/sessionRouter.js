import express from 'express';
const router = express.Router();

import * as sessionsController from '../../controller/shared/sessionController.js'

router.post('/register/', sessionsController.register)
router.post('/login/', sessionsController.login)
router.post('/verifySession/', sessionsController.checkSession)

router.get('/', (req, res) => {
    const tempResponse = new utils.helloWorldResponse()
    tempResponse.setAll(true, "Successfully connected to version 0 of the session controller.")
    res.json(tempResponse.responseDef)
});

// Export the router
export default router;