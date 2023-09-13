const config = require("./../config/config");
const configStruct = config.getConfig();

const initDatabase = async (mongoose) => {
  try {
    await mongoose.connect(configStruct.database_mongo.address, {
      useNewUrlParser: true
    });

    if (mongoose.connection.readyState === 1) {
      console.log('Successfully connected to the database: ' + configStruct.database_mongo.name);
    }

  } catch (error) {
    throw new Error('Error connecting to the database: ' + configStruct.database_mongo.name);
  }
}

module.exports = {
  initDatabase
};