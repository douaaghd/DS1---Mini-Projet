const Project = require("../models/Project");

// create yanni lajout dun nouveau projet
const createProject = async (req, res) => {
  try {
    const { nom, description, statut } = req.body;

    const projet = await Project.create({
      nom,
      description,
      statut: statut || "en cours", 
      owner: req.user.id, // iji projet eli tebaa user eli connecta 
    });

    res.status(201).json(projet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// read all trajaalek les projet kol
const getProjects = async (req, res) => {
  try {
    let projets;
    if (req.user.role === "manager") {
      // Manager voit tous les projets
      projets = await Project.find().populate("owner", "nom login");
    } else {
      // User voit seulement ses projets
      projets = await Project.find({ owner: req.user._id });
    }
    res.json(projets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// taatik projet par ID
const getProjectById = async (req, res) => {
  try {
    const projet = await Project.findById(req.params.id).populate("owner", "nom login");
    if (!projet) return res.status(404).json({ message: "Projet non trouvé" });
    res.json(projet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProject, getProjects, getProjectById };
