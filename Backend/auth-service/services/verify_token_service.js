require('dotenv').config();
const jwt = require("jsonwebtoken");

const { NoTokenReceivedError, ModifiedTokenError } = require("./../errors/errors.js");

const verifyToken = async (token) => {
    if (!token) throw new NoTokenReceivedError();

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return { user_id: decodedToken.user_id, auth_client_id: decodedToken.auth_client_id };
    } catch (error) {
        throw new ModifiedTokenError();
    }
}

module.exports = {
    verifyToken: verifyToken,
};
