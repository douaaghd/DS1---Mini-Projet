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
// UPDATE = Modifier projet
const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    // njiibou projet mel base
    const projet = await Project.findById(projectId);

    if (!projet) {
      return res.status(404).json({ message: "Projet introuvable" });
    }

    // ken user moch manager w moch howa el owner → ma najmouch yaamel update
    if (req.user.role !== "manager" && projet.owner.toString() !== req.user._id) {
      return res.status(403).json({ message: "Accès refusé. Vous ne pouvez modifier que vos projets." });
    }

    // Modifier
    const updated = await Project.findByIdAndUpdate(
      projectId,
      req.body,
      { new: true } // traja3lek el version jdida
    );

    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// DELETE = Supprimer projet
const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.id;

    // njiibou projet mel base
    const projet = await Project.findById(projectId);

    // ken mafama chay
    if (!projet) {
      return res.status(404).json({ message: "Projet introuvable" });
    }

    // 2. vérification des permissions
    // manager → ynajjem yfasakh ay projet
    // user normal → yfasakh ken projet mte3ou
    if (req.user.role !== "manager" && projet.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Accès refusé. Tnajjem tfasakh ken les projets mte3ek."
      });
    }

    // 3. suppression (remove maadech ikhdem, nistaamlou findByIdAndDelete)
    await Project.findByIdAndDelete(projectId);

    // 4. réponse
    res.json({ message: "Projet supprimé avec succès" });

  } catch (error) {
    // Erreur serveur
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProject, getProjects, getProjectById, updateProject, deleteProject
};
