import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the user who created the todo
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
