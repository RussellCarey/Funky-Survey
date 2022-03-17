class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = "fail";
    // this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    //! Whats this?
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
