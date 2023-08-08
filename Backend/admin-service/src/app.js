const mongoose = require("mongoose");
const express = require("express");

const adminRoutes = require("./routes/admin_routes")
const mongodb = require("./db/mongoose");
const config = require("./config/config");
const configStruct = config.getConfig();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const redis = require("redis");

// Superadmin configuration

const Admin = require("./models/Admin");
const Mode = require("./models/authorizationMode");

const createSuperadmin = async () => {
  try {
    const superadmin = new Admin({
      name: 'admin',
      email: 'admin@example.com',
      password: 'password',
    });

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(superadmin.password, salt);
    superadmin.password = encryptedPassword;

    const emailExists = await Admin.findOne({ email: superadmin.email });

    if (!emailExists) {
      superadmin.save()
        .then(() => {
          console.log('Superadmin created.');
        })
        .catch((err) => {
          console.error('Error creating superadmin:', err);
        });
    }
  } catch (err) {
    console.error('Error creating superadmin:', err);
  }
}

const createMode = async () => {
  try {
    let mode = await Mode.findOne();
    if (!mode) {
      mode = new Mode({ mode: "manual" });
    }
    await mode.save();
  } catch (err) {
    console.error('Error creating mode:', err);
  }
}

createSuperadmin();
createMode();

const initApp = async (expressApp) => {
  await mongodb.initDatabase(mongoose);

  var redisClient = redis.createClient(
    `redis://${configStruct.redis.host}:${configStruct.redis.port}`
  );

  expressApp.use(express.json());
  expressApp.use(cookieParser());
  expressApp.use("/api/admins", adminRoutes);
}

module.exports = {
  initApp,
};
