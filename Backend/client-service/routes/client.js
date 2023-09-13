const express = require("express");
const clientController = require("../controllers/client-controller")
const router = new express.Router();
const authentication = require("../middleware/authentication");

router.get("/auth-events", clientController.getAuthorizedEvents);
router.get("/events", clientController.getEvents);

router.post("/purchases", clientController.purchaseEvent);
router.post("/register", clientController.registerClient);
router.post("/login", clientController.logIn);
router.post("/logout", clientController.logout);

module.exports = router;
