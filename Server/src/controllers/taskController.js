import { createTask, getTasks, updateTask, deleteTask } from "../models/Task.js";

// Fetch all tasks for logged-in user
export const fetchTasks = async (req, res) => {
  try {
    const { sortBy = "end_date", order = "ASC", page = 1, limit = 5 } = req.query;

    const tasks = await getTasks(
      req.user.id,
      sortBy,
      order.toUpperCase(),
      Number(page),
      Number(limit)
    );

    res.json(tasks);
  } catch (err) {
    console.error("Fetch Tasks Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// Get a single task by ID
export const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const tasks = await getTasks(req.user.id, "id", "ASC", 1, 1000); // fetch all tasks for filtering
    const task = tasks.find(t => t.id === Number(taskId));

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    console.error("Get Task Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// Add a new task
export const addTask = async (req, res) => {
  try {
    const { title, description, priority, endDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Default endDate to 7 days from now if not provided
    const taskEndDate = endDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await createTask(req.user.id, {
      title,
      description: description || "",
      priority: priority || "medium",
      endDate: taskEndDate
    });

    res.status(201).json({ message: "Task created successfully" });
  } catch (err) {
    console.error("Add Task Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// Update a task by ID
export const editTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const updated = await updateTask(taskId, req.user.id, req.body);

    if (updated.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found or not allowed to update" });
    }

    res.json({ message: "Task updated successfully" });
  } catch (err) {
    console.error("Edit Task Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// Delete a task by ID
export const removeTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const deleted = await deleteTask(taskId, req.user.id);

    if (deleted.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found or not allowed to delete" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Remove Task Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};
