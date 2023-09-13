require('dotenv').config();

const jwt = require("jsonwebtoken");
const config = require("./../config/env_dev.json");

const tokenModel = require("./../models/token");
const { AuthenticationError } = require("./../errors/errors.js");

const generateToken = async (userID, authClientID) => {
    if (!userID || !authClientID) {
        throw new AuthenticationError("Invalid json body: missing claims", 400);
    }

    const expirate = config.jwt_config.expiration_in_mins;

    const token = new tokenModel.Token(userID, authClientID);
    const tokenAsJson = token.toJson();

    return jwt.sign(tokenAsJson, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expirate });
}

module.exports = {
    generateToken: generateToken,
};
