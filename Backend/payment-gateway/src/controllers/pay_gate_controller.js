paymentService = require("../services/pay_gate_service");

const validatePayment = (req, res) => {
  try {
    const paymentStatus = paymentService.processPayment();
    if (paymentStatus) {
      res.status(200).json({ success: true, paymentStatus: 'Payment is valid' });
    } else {
      res.status(200).json({ success: false, paymentStatus: 'Payment failed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  validatePayment
};