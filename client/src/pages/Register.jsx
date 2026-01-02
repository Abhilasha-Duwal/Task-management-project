import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../config/axiosConfig";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { loginSuccess } from "../store/slices/authSlice";
import "../styles/Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", formData);
      // Store token in Redux after successful registration
      dispatch(
        loginSuccess({
          token: res.data.token,
          userName: res.data.user.name,
        })
      );
      toast.success(res.data.message || "Registration successful!");
      // Redirect to dashboard
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Register failed!"
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h3>Create Account</h3>
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <InputField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
          <InputField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <Button type="submit">Register</Button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
