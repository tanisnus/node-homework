const express = require("express");
const path = require("path");
const { randomUUID } = require("crypto");
const dogsRouter = require("./routes/dogs");
const securityHeaders = require("./middleware/security-headers");
const validateContentType = require("./middleware/content-type");

const app = express();

app.use((req, res, next) => {
  req.requestId = randomUUID();
  res.setHeader("X-Request-Id", req.requestId);
  next();
});

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}]: ${req.method} ${req.path} (${req.requestId})`);
  next();
});

app.use(securityHeaders);

// Assignment 3b and 3c ask you to add middleware in this file.
app.use(express.json({ limit: "1mb" }));
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(validateContentType);

app.use("/", dogsRouter); // Do not remove this line

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    requestId: req.requestId,
  });
});


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (statusCode >= 400 && statusCode < 500) {
    console.warn(`WARN: ${err.name} - ${err.message}`);
  } else {
    console.error(`ERROR: ${err.name} - ${err.message}`);
  }

  const errorMessage =
    statusCode === 500 ? "Internal Server Error" : err.message;

  res.status(statusCode).json({
    error: errorMessage,
    requestId: req.requestId,
  });
});

if (require.main === module) {
  app.listen(3000, () => {
    console.log("Dog rescue app is listening on port 3000...");
  });
}

module.exports = app;
