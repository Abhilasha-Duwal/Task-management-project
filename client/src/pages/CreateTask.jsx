import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTask } from "../store/slices/taskSlice";
import InputField from "../components/InputField";
import Button from "../components/Button";
import AuthGuard from "../components/AuthGuard";
import "../styles/Task.css";

const CreateTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    end_date: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(createTask(formData)).unwrap();
      toast.success(response.message || "Task created successfully!");
      navigate("/"); // go back to dashboard
    } catch (err) {
      toast.error(err.message || err || "Failed to create task!");
    }
  };

  return (
    <AuthGuard>
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Create New Task</h2>
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
            <Button type="submit">Create Task</Button>
          </form>
        </div>
      </div>
    </AuthGuard>
  );
};

export default CreateTask;
