const Project = require("../models/Project");

// CREATE : Ajouter un projet
const createProject = async (req, res) => {
  try {
    const { nom, description, statut } = req.body;

    const projet = await Project.create({
      nom,
      description,
      statut: statut || "en cours",
      owner: req.user._id,
    });

    res.status(201).json(projet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProject };
