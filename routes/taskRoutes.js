const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");

// naamlou tâche jdida
router.post("/", authMiddleware, taskController.createTask);

// Obtenir toutes les tâches 
router.get("/", authMiddleware, taskController.getTasks);

// GET /api/tasks/:id - Obtenir une tâche par ID
router.get("/:id", authMiddleware, taskController.getTaskById);

// nbadlou tâche
router.put("/:id", authMiddleware, taskController.updateTask);

// nfaskhou une tâche
router.delete("/:id", authMiddleware, taskController.deleteTask);

module.exports = router;
