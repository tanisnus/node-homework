const { ValidationError } = require("../errors");

function validateContentType(req, res, next) {
  if (!["POST", "PUT", "PATCH"].includes(req.method)) {
    return next();
  }

  const contentType = req.headers["content-type"];
  if (!contentType || !contentType.includes("application/json")) {
    return next(
      new ValidationError("Content-Type must be application/json"),
    );
  }

  next();
}

module.exports = validateContentType;
