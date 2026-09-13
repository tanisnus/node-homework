const express = require("express");
const router = express.Router();

const {
  register,
  logon,
  logoff,
  show,
  googleLogon,
} = require("../controllers/userController");
const jwtMiddleware = require("../middleware/jwtMiddleware");

router.post("/register", register);
router.post("/logon", logon);
router.post("/googleLogon", googleLogon);
router.post("/logoff", jwtMiddleware, logoff);
router.get("/:id", show);

module.exports = router;
