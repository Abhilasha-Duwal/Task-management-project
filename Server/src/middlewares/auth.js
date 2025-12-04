import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const auth = (req, res, next) => {
  console.log("Auth middleware triggered!");
  console.log("Cookies:", req.cookies);
  console.log("Authorization Header:", req.headers.authorization);

  const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];

  if (!token) {
    console.log("No token found! Blocking access.");
    return res.status(401).json({ message: "Unauthorized. Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token valid:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("Token invalid! Blocking access.");
    return res.status(403).json({ message: "Invalid Token" });
  }
};
