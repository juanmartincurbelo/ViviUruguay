const mongoose = require("mongoose");
const mongodb = require("./db/mongoose");
const clientRoutes = require("./routes/client");
const responseTime = require("response-time");
const cookieParser = require('cookie-parser');
const redis = require("redis");
const config = require("./config/config");
const configStruct = config.getConfig();

const initApp = async (expressApp) => {
    await mongodb.initDatabase(mongoose);

    redis.createClient(
        `redis://${configStruct.redis.host}:${configStruct.redis.port}`
    );

    expressApp.use(cookieParser());
    expressApp.use(responseTime());
    expressApp.use(configStruct.app.endpoint, clientRoutes);
}

module.exports = {
    initApp,
};
