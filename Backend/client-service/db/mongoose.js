const config = require("../config/config");
const configStruct = config.getConfig();

const initDatabase = async (mongoose) => {
    mongoose.connect(configStruct.mongo.address, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log('Conexión exitosa a MongoDB'))
        .catch((error) => console.error('Error al conectar a MongoDB:', error));
};

module.exports = {
    initDatabase,
};
