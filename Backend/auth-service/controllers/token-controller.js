const generateService = require("./../services/generate_token_service");
const verifyTokenService = require("./../services/verify_token_service");

const generate = async (req, res) => {
    try {
        const token = await generateService.generateToken(
            req.body.user_id, req.body.auth_client_id
        );
        res.status(201).cookie("authorization", token).json(token);
    } catch (error) {
        res.status(error.status).json(error.message);
    }
};

const verify = async (req, res) => {
    try {
        const receivedToken = req.headers.authorization;
        const userData = await verifyTokenService.verifyToken(receivedToken);
        res.status(200).json(userData);
    } catch (error) {
        res.status(error.status).json(error.message);
    }
};

const revoke = async (req, res) => {
    try {
        res.clearCookie('authorization');
        res.status(200).json("token successfully revoked");
    } catch (error) {
        res.status(error.status || 500).json(error.message);
    }
};

module.exports = {
    generate,
    verify,
    revoke
};
