import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import { createUser, findUserByEmail } from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Register body:", req.body);

    const user = await findUserByEmail(email);
    if (user) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    await createUser(name, email, hashed);

    res.json({ message: "you are registered successfully!" });
  } catch (err) {
    console.error("Register error:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find user
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send response
    res.json({
      message: "you are login successfully!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};
