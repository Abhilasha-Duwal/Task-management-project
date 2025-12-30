import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  fetchTasks,
  addTask,
  fetchTaskById,
  editTask,
  removeTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/", auth, fetchTasks);
router.post("/", auth, addTask);
router.get("/:id", auth, fetchTaskById);
router.put("/:id", auth, editTask);
router.delete("/:id", auth, removeTask);

export default router;
