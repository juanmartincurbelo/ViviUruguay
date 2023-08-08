const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin_controller');
const authentication = require("../middleware/authentication");

router.post('/', authentication, adminController.registerAdmin);
router.post('/providers', authentication, adminController.registerProvider);

router.post('/login', adminController.login);
router.post('/logout', adminController.logout);

router.put('/authorization-mode', authentication, adminController.updateAuthorizationMode);
router.put('/authorization', authentication, adminController.authorizeEvent);
router.put('/deauthorization', authentication, adminController.deauthorizeEvent);

router.get('/application-logs/:startDate/:endDate', authentication, adminController.getApplicationLogs);
router.get('/active-events', authentication, adminController.getActiveEvents);
router.get('/events/:startDate/:endDate', authentication, adminController.getEvents);

module.exports = router;
