import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateTask } from "../store/slices/taskSlice";
import InputField from "../components/InputField";
import Button from "../components/Button";
import AuthGuard from "../components/AuthGuard";
import "../styles/Task.css";

const EditTask = () => {
  const { id } = useParams(); // task ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tasks = useSelector((state) => state.tasks.tasks);
  const auth = useSelector((state) => state.auth);
  const userId = auth.userId;

  const taskToEdit = tasks.find((t) => t.id === parseInt(id));

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    end_date: "",
    user_id: userId || "",
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        priority: taskToEdit.priority,
        end_date: taskToEdit.end_date.split("T")[0], // format date for input
        user_id: taskToEdit.user_id,
      });
    }
  }, [taskToEdit]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateTask({ id, updatedData: formData })).unwrap();
      navigate("/"); // go back to dashboard
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  if (!taskToEdit) {
    return (
      <AuthGuard>
        <div className="container mt-5 text-center">
          <p>Task not found!</p>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Edit Task</h2>
        <div className="task-form-card">
          <form onSubmit={handleSubmit}>
            <InputField
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Task Title"
              required
            />
            <InputField
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              required
            />
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-select mb-3"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <InputField
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
            />
            <Button type="submit">Update Task</Button>
          </form>
        </div>
      </div>
    </AuthGuard>
  );
};

export default EditTask;
