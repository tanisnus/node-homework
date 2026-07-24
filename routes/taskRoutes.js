const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");

router.get("/tasks", taskController.getTasks);
router.get("/id", taskController.show);
router.post("/", taskController.create);
router.patch("/:id", taskController.update);
router.delete("/:id", taskController.delete);

module.exports = router



