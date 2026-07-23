const express = require("express");
const dogs = require("../dogData");
const { ValidationError, NotFoundError } = require("../errors");

const router = express.Router();

router.get("/dogs", (req, res) => {
  res.status(200).json(dogs);
});

router.post("/adopt", (req, res, next) => {
  try {
    const { name, email, dogName, address } = req.body;

    if (!name || !email || !dogName) {
      throw new ValidationError("Missing required fields: name, email, and dogName");
    }

    const dog = dogs.find((d) => d.name === dogName);
    if (!dog || dog.status !== "available") {
      throw new NotFoundError(
        `${dogName} not found or not available for adoption`,
      );
    }

    res.status(201).json({
      message: `Adoption request received. We will contact you at ${email} for further details.`,
      application: {
        name,
        address,
        email,
        dogName,
        applicationId: Date.now(),
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get("/error", (req, res, next) => {
  next(new Error("Test error"));
});

module.exports = router;
