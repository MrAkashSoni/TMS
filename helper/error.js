class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const handleError = (err, res) => {
    // eslint-disable-next-line prefer-const
    let { statusCode, message } = err;
    statusCode = statusCode == undefined ? 500 : statusCode;
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
};

module.exports = {
    ErrorHandler,
    handleError,
};
