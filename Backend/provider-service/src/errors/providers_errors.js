class EventError extends Error {
  constructor(code, message) {
    super(message);
    this.status = code;
  }
}

class EventNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.status = 403;
  }
}

class BadRequestError extends Error {
  constructor(message = "Invalid event data") {
    super(message);
    this.name = this.constructor.name;
    this.status = 400;
  }
}

class EventValidationError extends Error {
  constructor(message = "Validation error") {
    super(message);
    this.name = this.constructor.name;
    this.status = 400;
  }
}

class InvalidTokenError extends Error {
  constructor(message = "Invalid token.") {
    super(message);
    this.name = this.constructor.name;
    this.status = 401;
  }
}

class InvalidAccessTokenError extends Error {
  constructor(message = "You do not have access to perform this action.") {
    super(message);
    this.status = 403;
  }
}

module.exports = {
  EventError,
  EventNotFoundError,
  BadRequestError,
  EventValidationError,
  InvalidTokenError,
  InvalidAccessTokenError,
  ForbiddenError
};