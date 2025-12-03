const Task = require("../models/Task");
const Project = require("../models/Project");

// Créer une nouvelle tâche
const createTask = async (req, res) => {
  try {
    const { titre, description, statut, deadline, projectId, assignedTo } = req.body;

    // Vérifier si le projet existe
    const projet = await Project.findById(projectId);
    if (!projet) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }

    // Seul le manager peut assigner une tâche à quelqu'un
    if (assignedTo && req.user.role !== "manager") {
      return res.status(403).json({ message: "Seul le manager peut assigner une tâche" });
    }

    const task = await Task.create({
      titre,
      description,
      statut: statut || "todo",
      deadline,
      project: projectId,
      assignedTo: assignedTo || null
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask };
