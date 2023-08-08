const express = require('express');
const expressApp = express();
const config = require("./config/env_dev.json");
const authRoutes = require("./routes/token");

const cookieParser = require("cookie-parser");
expressApp.use(cookieParser());
expressApp.use(express.json());

const PORT = config.app.port || 3002;
expressApp.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});

expressApp.use('/api/tokens', authRoutes);
