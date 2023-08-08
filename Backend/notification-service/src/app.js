const config = require("./config/config");
const configStruct = config.getConfig();
const redis = require("redis");

require("./services/check-authorized-queue");
require("./services/done-purchase-queue");
require("./services/failed-purchase-queue");
require("./services/event-data-queue");
require("./services/deauthorized-queue");
require("./services/authorization-queue");


const initApp = async () => {
    redis.createClient(
        `redis://${configStruct.redis.host}:${configStruct.redis.port}`
    );
}

module.exports = {
    initApp,
};
