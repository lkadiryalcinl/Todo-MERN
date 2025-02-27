const Todo = require("../models/Todo");

// Create a new Todo
exports.createTodo = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const user = req.user;
    
    const newTodo = new Todo({
      title,
      description,
      date,
      user,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json({ message: "Todo created successfully", todo: savedTodo });
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo", details: error.message });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().populate("user", "name email"); // Populates user info
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos", details: error.message });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id).populate("user", "name email");
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todo", details: error.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, isFavorited, isCompleted } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, date, isFavorited, isCompleted },
      { new: true, runValidators: true }
    );

    if (!updatedTodo) return res.status(404).json({ message: "Todo not found" });

    res.status(200).json({ message: "Todo updated successfully", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo", details: error.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) return res.status(404).json({ message: "Todo not found" });

    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo", details: error.message });
  }
};

exports.deleteAllTodos = async (req, res) => {
  try {
    const result = await Todo.deleteMany({});
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No todos found to delete" });
    }

    res.status(200).json({ message: "All todos deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todos", details: error.message });
  }
};

exports.toggleFavorited = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);
    todo.isFavorited = !todo.isFavorited;

    const updatedTodo = await Todo.updateOne(todo);

    if (!updatedTodo) return res.status(404).json({ message: "Todo not found" });

    res.status(200).json({ message: "Favorited status toggled", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: "Failed to toggle favorited status", details: error.message });
  }
};

exports.toggleCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findById(id);
    todo.isCompleted = !todo.isCompleted;

    const updatedTodo = await Todo.updateOne(todo);

    if (!updatedTodo) return res.status(404).json({ message: "Todo not found" });

    res.status(200).json({ message: "Completed status toggled", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ error: "Failed to toggle completed status", details: error.message });
  }
};