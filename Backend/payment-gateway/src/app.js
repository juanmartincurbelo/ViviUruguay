const express = require("express");

const payment_gateway_routes = require("./routes/pay_gate_routes");

const initApp = async (expressApp) => {
  expressApp.use(express.json());
  expressApp.use("/api/payments", payment_gateway_routes);
}

module.exports = {
  initApp,
};
