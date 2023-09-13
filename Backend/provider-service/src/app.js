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

  const redisClient = redis.createClient(
    `redis://${configStruct.redis.host}:${configStruct.redis.port}`
  );

  const parentDir = path.resolve(__dirname, "../../..");
  const frontendPublicPath = path.join(parentDir, "Frontend", "public");

  const uploadsPath = path.join(frontendPublicPath, "eventImages");
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
    console.log('Carpeta "uploads" creada en la carpeta "public/eventImages" del frontend');
  }

  expressApp.use("/api/providers", providerRoutes);
};

module.exports = {
  initApp,
};
