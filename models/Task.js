const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    trim: true // nestanewa spaces
  },
  description: {
    type: String,
    default: ""
  },
  statut: {
    type: String,
    enum: ["todo", "doing", "done"],
    default: "todo"
  },
  deadline: {
    type: Date,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
