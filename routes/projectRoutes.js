const express = require("express");
const router = express.Router();
const { createProject, getProjects, getProjectById, updateProject,    
  deleteProject } = require("../controllers/projectController");
const authMiddleware = require("../middlewares/authMiddleware");

// Routes pour créer projet – l'utilisateur lezmou iconnecti
router.post("/", authMiddleware, createProject);

// manager ichouf les projet lkol ama user ken projet metou
router.get("/", authMiddleware, getProjects);
router.get("/:id", authMiddleware, getProjectById);

// UPDATE (modifier un projet)
router.put("/:id", authMiddleware, updateProject);

// DELETE (supprimer un projet)
router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;
