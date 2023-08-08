const fetch = require("node-fetch");

const config = require("../config/config");
const configStruct = config.getConfig();

const { InvalidTokenError, InvalidAccessTokenError } = require("../errors/providers_errors");
const logger = require('./../../../utils/logger');

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies["authorization"];

    if (!token) {
      throw new InvalidTokenError("No token provided");
    }

    const response = await fetch(configStruct.auth_service.verify_address, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'authorization': token }
    });

    if (response.status != 200) {
      throw new InvalidTokenError(response.message, response.status);
    }
    const data = await response.json();

    if (data.auth_client_id != "provider") {
      logger.info('Unauthorized action attempt by a user who is not a Provider.');
      throw new InvalidAccessTokenError();
    }

    req.user = data;
    next();
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json(error.message);
  }
}
module.exports = authentication

