class Token {
    constructor(userID, authClientID) {
        this.user_id = userID;
        this.auth_client_id = authClientID;
    }

    toJson() {
        return {
            user_id: this.user_id,
            auth_client_id: this.auth_client_id
        };
    }
}

module.exports = {
    Token: Token,
};