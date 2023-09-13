class AuthenticationError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status || 500;
    }
}

class NoTokenReceivedError extends Error {
    constructor(message = "There was no token provided") {
        super(message);
        this.status = 401;
    }
}

class ModifiedTokenError extends Error {
    constructor(message = "The provided token is invalid, as it was manipulated") {
        super(message);
        this.status = 401;
    }
}

module.exports = {
    AuthenticationError,
    NoTokenReceivedError,
    ModifiedTokenError,
};
