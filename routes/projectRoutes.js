const express = require("express");
const router = express.Router();
const { createProject, getProjects, getProjectById } = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");

// Routes pour créer projet – l'utilisateur lezmou iconnecti
router.post("/", authMiddleware, createProject);

// manager ichouf les projet lkol ama user ken projet metou
router.get("/", authMiddleware, getProjects);
router.get("/:id", authMiddleware, getProjectById);

module.exports = router;
