const express = require("express");
const tokenController = require("./../controllers/token-controller")
const router = new express.Router();

router.post("/generate", tokenController.generate);
router.post("/verify", tokenController.verify);
router.delete("/revoke", tokenController.revoke);

module.exports = router;
