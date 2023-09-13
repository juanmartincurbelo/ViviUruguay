const express = require("express");
const router = new express.Router();

const paymentGatewayController = require("../controllers/pay_gate_controller");

router.post("", paymentGatewayController.validatePayment);

module.exports = router;