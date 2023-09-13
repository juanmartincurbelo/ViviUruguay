class PurchaseError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 500;
  }
}

class EventValidationError extends Error {
  constructor(message = "Validation error") {
    super(message);
    this.status = 400;
  }
}


module.exports = {
  EventValidationError,
  PurchaseError,
};
