const mongoose = require("mongoose");
const redis = require("redis");
const responseTime = require("response-time");
const cookieParser = require('cookie-parser');

const mongodb = require("./db/mongoose");
const config = require("./config/config");
const configStruct = config.getConfig();
require("./services/purchase-service")

const initApp = async (expressApp) => {
    await mongodb.initDatabase(mongoose);

    redis.createClient(
        `redis://${configStruct.redis.host}:${configStruct.redis.port}`
    );

    expressApp.use(cookieParser());
    expressApp.use(responseTime());
}

module.exports = {
    initApp,
};
