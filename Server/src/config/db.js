import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

async function connectWithRetry() {
  let retries = 5;

  while (retries) {
    try {
      const db = await mysql.createConnection({
        host: process.env.DB_HOST || "mysql",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || "root",
        database: process.env.DB_NAME || "mydb",
        port: process.env.DB_PORT || 3306,
      });

      console.log("Connected to MySQL!");
      return db; // <-- return the correct variable
    } catch (err) {
      console.log("MySQL not ready, retrying...", retries);
      await new Promise((res) => setTimeout(res, 5000));
      retries--;
    }
  }

  throw new Error("Could not connect to MySQL");
}

// Call the function immediately and export the connected instance
const db = await connectWithRetry();
export default db;
