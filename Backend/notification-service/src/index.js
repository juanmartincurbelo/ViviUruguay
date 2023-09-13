const express = require('express');
const app = require('./app');
const expressApp = express();
const config = require("./config/config");
const configStruct = config.getConfig();

app.initApp();
expressApp.use(express.json());

const PORT = configStruct.app.port || 3007;
expressApp.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});