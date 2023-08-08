const express = require("express");
const path = require('path');
const fs = require('fs');

const router = new express.Router();

const providerController = require("../controllers/provider_controller");
const authentication = require("../middleware/authentication");
const imageUpload = require("../middleware/uploads");
const updateUploads = require("../middleware/update_uploads");


router.get("/events", authentication, providerController.getProviderEvents);

router.get("/event", authentication, providerController.getProviderEvent);

router.put("/events/update-info", authentication, providerController.updateEventInfo);

router.post("/send", authentication, providerController.sendMessage);

router.post("/login", providerController.login);
router.post("/logout", providerController.logout);

module.exports = router;
