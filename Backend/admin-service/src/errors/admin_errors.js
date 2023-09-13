class AdminError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 500;
  }
};

class BadRequestError extends Error {
  constructor(message = "Bad request.") {
    super(message);
    this.status = 400;
  }
};

class MissingFieldsError extends Error {
  constructor(message = "Missing required fields.") {
    super(message);
    this.status = 400;
  }
};

class InvalidEmailError extends Error {
  constructor(message = "Invalid email address.") {
    super(message);
    this.status = 400;
  }
};

class RegisteredEmailError extends Error {
  constructor(message = "Email already registered.") {
    super(message);
    this.status = 400;
  }
};

class InvalidCredentialsError extends Error {
  constructor(message = "Wrong email or password.") {
    super(message);
    this.status = 401;
  }
};

class InvalidTokenError extends Error {
  constructor(message = "Invalid token.") {
    super(message);
    this.status = 401;
  }
}

class InvalidAccessTokenError extends Error {
  constructor(message = "You do not have access to perform this action.") {
    super(message);
    this.status = 403;
  }
}

class InvalidInputError extends Error {
  constructor(message = "Invalid input.") {
    super(message);
    this.status = 400;
  }
}

class EventNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class DatesError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = {
  AdminError,
  MissingFieldsError,
  InvalidEmailError,
  RegisteredEmailError,
  InvalidInputError,
  EventNotFoundError,
  InvalidCredentialsError,
  InvalidTokenError,
  BadRequestError,
  InvalidAccessTokenError,
  DatesError,
};
