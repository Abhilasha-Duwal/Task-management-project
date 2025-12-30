import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../config/axiosConfig";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { loginSuccess } from "../store/slices/authSlice";
import "../styles/Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", formData);

      // Dispatch login success to Redux
      dispatch(loginSuccess(res.data.token));
      toast.success(res.data.message || "Login successful!");

      // Redirect to Task page
      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Login failed!");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
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
          <Button type="submit">Login</Button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
