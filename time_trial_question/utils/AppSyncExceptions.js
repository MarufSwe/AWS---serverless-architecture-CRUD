class AppSyncExceptions extends Error {
    constructor(errorType="UnknownException",errorMessage="unknown aws serverless exception occurs") {
        super(errorMessage);
        this.name = errorType;
        this.message = JSON.stringify(errorMessage)
    }
}

module.exports = AppSyncExceptions