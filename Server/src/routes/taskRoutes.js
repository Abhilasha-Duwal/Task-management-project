import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  fetchTasks,
  addTask,
  getTaskById,
  editTask,
  removeTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", auth, fetchTasks);
router.post("/", auth, addTask);
router.get("/:id", auth, getTaskById);
router.put("/:id", auth, editTask);
router.delete("/:id", auth, removeTask);

export default router;
