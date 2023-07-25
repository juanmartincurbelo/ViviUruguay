const mongoose = require("mongoose");
const express = require("express");
const fs = require("fs");
const path = require("path");
const redis = require("redis");

const config = require("./config/config");
const configStruct = config.getConfig();

const providerRoutes = require("./routes/provider_routes")
const mongodb = require("./db/mongoose");
const cookieParser = require('cookie-parser');

const initApp = async (expressApp) => {
  await mongodb.initDatabase(mongoose);

  expressApp.use(express.json());
  expressApp.use(cookieParser());

  redis.createClient(
    `redis://${configStruct.redis.host}:${configStruct.redis.port}`
  );

  const parentDir = path.resolve(__dirname, "../..");

  const uploadsPath = path.join(parentDir, "uploads")
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath);
    console.log('Carpeta "uploads" creada');
  }

  expressApp.use("/api/providers", providerRoutes);
}

module.exports = {
  initApp,
};
