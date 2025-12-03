const express = require("express");
const router = express.Router();
const { createTask } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware"); // middleware pour authentification

router.post("/", protect, createTask);

module.exports = router;
