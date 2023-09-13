const config = require("./../config/config");
const configStruct = config.getConfig();

const initDatabase = async (mongoose) => {
  mongoose.connect(configStruct.mongo.address, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Failed to connect to MongoDB:', error));
};

module.exports = {
  initDatabase,
};
