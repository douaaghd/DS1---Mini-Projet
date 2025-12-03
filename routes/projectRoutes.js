const express = require("express");
const router = express.Router();
const { createProject } = require("../controllers/projectController");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE – Ajouter un projet
router.post("/", authMiddleware, createProject);

module.exports = router;
