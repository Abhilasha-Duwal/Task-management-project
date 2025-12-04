import db from "../config/db.js";

// Create a new task
export const createTask = async (
  userId,
  { title, description, priority, endDate }
) => {
  const [rows] = await db.query(
    `INSERT INTO tasks (user_id, title, description, priority, end_date)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, title, description, priority, endDate]
  );
  return rows;
};

// Fetch tasks with pagination, sorting, and overdue flag
export const getTasks = async (
  userId,
  sortBy = "end_date",
  order = "ASC",
  page = 1,
  limit = 5
) => {
  const offset = (page - 1) * limit;

  // Validate column and order
  const validSortColumns = ["end_date", "priority", "title", "id"];
  const validOrders = ["ASC", "DESC"];

  const column = validSortColumns.includes(sortBy) ? sortBy : "end_date";
  const sortOrder = validOrders.includes(order.toUpperCase()) ? order.toUpperCase() : "ASC";

  const [tasks] = await db.query(
    `SELECT *, (end_date < CURDATE()) AS overdue
     FROM tasks 
     WHERE user_id = ?
     ORDER BY ${column} ${sortOrder}
     LIMIT ? OFFSET ?`,
    [userId, limit, offset]
  );

  const [countRows] = await db.query(
    "SELECT COUNT(*) as total FROM tasks WHERE user_id = ?",
    [userId]
  );
  const totalTasks = countRows[0].total;
  const totalPages = Math.ceil(totalTasks / limit);

  return {
    pagination: {
      totalItems: totalTasks,
      totalPages,
      currentPage: page,
      pageSize: limit,
    },
    tasks,
  };
};

// Get single task by ID
export const getTaskById = async (userId, taskId) => {
  const [tasks] = await db.query(
    "SELECT * FROM tasks WHERE user_id = ? AND id = ?",
    [userId, taskId]
  );

  if (!tasks.length) return null;
  return tasks[0];
};

// Update a task dynamically
export const updateTask = async (id, userId, data) => {
  const { title, description, priority, endDate } = data;

  // Build dynamic query
  const fields = [];
  const values = [];

  if (title !== undefined) {
    fields.push("title = ?");
    values.push(title);
  }
  if (description !== undefined) {
    fields.push("description = ?");
    values.push(description);
  }
  if (priority !== undefined) {
    fields.push("priority = ?");
    values.push(priority);
  }
  if (endDate !== undefined) {
    fields.push("end_date = ?");
    values.push(endDate);
  }

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  values.push(id, userId);

  const sql = `UPDATE tasks SET ${fields.join(
    ", "
  )} WHERE id = ? AND user_id = ?`;

  const [rows] = await db.query(sql, values);
  return rows;
};

// Delete a task
export const deleteTask = async (id, userId) => {
  const [rows] = await db.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [id, userId]
  );
  return rows;
};
