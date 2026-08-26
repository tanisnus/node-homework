const express = require("express");
const router = express.Router();

const { getUserAnalytics, getUsersWithStats, searchTasks } = require("../controllers/analyticsController");
const jwtMiddleware = require("../middleware/jwtMiddleware");

router.use(jwtMiddleware);

router.get("/users", getUsersWithStats);
router.get("/users/:id", getUserAnalytics);
router.get("/tasks/search", searchTasks);

module.exports = router;
