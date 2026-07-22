function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const errorMessage =
    statusCode === 500 ? "Internal Server Error" : err.message;

  res.status(statusCode).json({ error: errorMessage });
}

module.exports = errorHandler;
