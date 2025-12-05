const Task = require("../models/Task");
const Project = require("../models/Project");

// CREATE – nzidou tâche jdida
const createTask = async (req, res) => {
  try {
    const { titre, description, statut, deadline, projectId, assignedTo } = req.body;

    // nchoufou ken el projet mawjoudd
    const projet = await Project.findById(projectId);
    if (!projet) {
      return res.status(404).json({ message: "Projet ma l9inech" });
    }

    // ken fama assignedTo w user moch manager → ma ynejmch yaamel assign
    if (assignedTo && req.user.role !== "manager") {
      return res.status(403).json({ message: "Accès refusé. Seul manager ynajjem yaamel assign" });
    }

    // nzidou tâche jdida
    const task = await Task.create({
      titre,
      description,
      statut: statut || "todo", // default "todo" ken ma b3athnach
      deadline,
      project: projectId, // field f schema esmo project
      assignedTo: assignedTo || null
    });

    res.status(201).json(task); // 201: Créé

  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Données mta3 la tâche ghlet", details: error.message });
    }
    res.status(500).json({ message: "Erreur serveur waqt li nzidou la tâche" });
  }
};

// READ – njibou kol les tâches
const getTasks = async (req, res) => {
  try {
    const { statut, sort } = req.query;
    let filter = {};
    let sortOptions = {};

    // filtre ala statut
    if (statut) {
      filter.statut = statut;
    }

    // tri
    if (sort) {
      const order = sort.startsWith('-') ? -1 : 1;
      const field = sort.startsWith('-') ? sort.substring(1) : sort;
      sortOptions[field] = order;
    }

    // njibou les tâches w npopulate assignedTo w project
    const tasks = await Task.find(filter)
      .sort(sortOptions)
      .populate("assignedTo", "nom login")
      .populate("project", "nom description statut")
      .exec();

    res.json(tasks);

  } catch (error) {
    res.status(500).json({ message: "Erreur serveur waqt li njibou les tâches" });
  }
};

// READ – njib tâche par ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("assignedTo", "nom login")
      .populate("project", "nom description statut");

    if (!task) {
      return res.status(404).json({ message: "Tâche ma l9inech" });
    }

    res.json(task);

  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "ID mta3 la tâche ghlet" });
    }
    res.status(500).json({ message: "Erreur serveur waqt li njib tâche" });
  }
};

// UPDATE – nmodifiw tâche
const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Tâche ma l9inech" });
    }

    // ken fama assign w user moch manager → ma nkhalliwehch
    if (req.body.assignedTo !== undefined && req.user.role !== "manager") {
      return res.status(403).json({ message: "Seul manager ynajjem ybadal assignation" });
    }

    // update  tâche
    const updated = await Task.findByIdAndUpdate(taskId, req.body, { new: true, runValidators: true });

    res.json(updated);

  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "ID mta3 la tâche ghlet" });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Données mta3 update ghlet", details: error.message });
    }
    res.status(500).json({ message: "Erreur serveur waqt li nupdate tâche" });
  }
};

// DELETE nfaskhou tache 
const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    const result = await Task.findByIdAndDelete(taskId);

    if (!result) {
      return res.status(404).json({ message: "Tâche ma l9inech" });
    }

    res.json({ message: "Tâche tfas5et b succès" });

  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "ID mta3 la tâche ghlet" });
    }
    res.status(500).json({ message: "Erreur serveur waqt li nfas5ou tâche" });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};
