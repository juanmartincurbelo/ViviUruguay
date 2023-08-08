const express = require('express');
const app = require('./app');
const expressApp = express();
const config = require("./config/config");
const configStruct = config.getConfig();
const cors = require('cors');

app.initApp(expressApp);

expressApp.use(cors({
    origin: 'http://localhost:8080', // Aquí debes colocar el origen correcto de tu frontend
    credentials: true, // Si estás utilizando cookies o autenticación basada en sesiones
}));
expressApp.use(express.json());

const PORT = configStruct.app.port || 3003;
expressApp.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});