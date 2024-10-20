import express from 'express';
const router = express.Router();

import * as sessionsController from '../../controller/shared/sessionController.js'

import * as utils from '../../utils/shared/responseModel.js'

router.post('/register/', sessionsController.register)
router.post('/login/', sessionsController.login)
router.post('/verifySession/', sessionsController.checkSession)

router.get('/', (req, res) => {
    const tempResponse = new utils.response()
    tempResponse.setAll(true, "Successfully connected to version 0 of the session controller.")
    res.json(tempResponse)
});

// Export the router
export default router;
