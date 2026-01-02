import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import { fetchTasks, deleteTask } from "../store/slices/taskSlice";
import AuthGuard from "../components/AuthGuard";
import "../styles/Task.css";

const Task = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tasks, pagination, loading } = useSelector((state) => state.tasks);
  const auth = useSelector((state) => state.auth);
  const userName = auth.userName || "User";

  // Sorting
  const [sortColumn, setSortColumn] = useState("end_date");
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch tasks whenever page changes
  useEffect(() => {
    dispatch(
      fetchTasks({
        page: currentPage,
        sortBy: sortColumn,
        order: sortOrder,
      })
    );
  }, [dispatch, currentPage, sortColumn, sortOrder]);

  // Handle sorting button click
  const handleSortChange = (column) => {
    let nextOrder = "asc";
    if (sortColumn === column) {
      nextOrder = sortOrder === "asc" ? "desc" : "asc"; // toggle
    }
    setSortColumn(column);
    setSortOrder(nextOrder);
    setCurrentPage(1); // reset to page 1
    dispatch(fetchTasks({ page: 1, sortBy: column, order: nextOrder }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setCurrentPage(newPage);
      dispatch(
        fetchTasks({ page: newPage, sortBy: sortColumn, order: sortOrder })
      );
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await dispatch(deleteTask(taskId)).unwrap();
        toast.success(response.message || "Task deleted successfully!");
        // Refresh tasks
        dispatch(
          fetchTasks({
            page: currentPage,
            sortBy: sortColumn,
            order: sortOrder,
          })
        );
      } catch (err) {
        toast.error(err.message || err || "Failed to delete task!");
      }
    }
  };

  return (
    <AuthGuard>
      <div className="container dashboard-container">
        <div className="d-flex justify-content-end mb-3 gap-2">
          <span className="fw-bold fs-3 text-info">{userName}</span>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <h2 className="mb-5 text-center">Dashboard</h2>

        <div className="mb-3 d-flex justify-content-between align-items-center">
          <button
            className="btn btn-success"
            onClick={() => navigate("/tasks/create")}
          >
            + Create New Task
          </button>

          <div className="d-flex align-items-center">
            <span className="me-2">Sort by:</span>
            <button
              className={`btn btn-outline-primary me-2 ${
                sortColumn === "end_date" ? "active" : ""
              }`}
              onClick={() => handleSortChange("end_date")}
            >
              Due Date
              {sortColumn === "end_date"
                ? sortOrder === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </button>
            <button
              className={`btn btn-outline-primary ${
                sortColumn === "priority" ? "active" : ""
              }`}
              onClick={() => handleSortChange("priority")}
            >
              Priority
              {sortColumn === "priority"
                ? sortOrder === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center">No tasks found.</p>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th style={{ width: "50px" }}>S.N</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>End Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task, index) => (
                    
                    <tr key={task.id}>
                      <td>
                        {index + 1 + (currentPage - 1) * pagination.pageSize}
                      </td>
                      <td>{task.title}</td>
                      <td style={{ maxWidth: "200px", wordWrap: "break-word" }}>
                        {task.description}
                      </td>
                      <td>{task.priority}</td>
                      <td>{new Date(task.end_date).toLocaleDateString()}</td>
                      <td className="d-flex justify-content-center gap-3">
                        <button
                          className="btn btn-sm btn-warning w-50"
                          onClick={() => navigate(`/tasks/edit/${task.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger w-50"
                          onClick={() => handleDelete(task.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-center mt-3 align-items-center">
              <button
                className="btn btn-primary me-2"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Prev
              </button>
              <span className="mx-2">
                Page {currentPage} of {pagination.totalPages}
              </span>
              <button
                className="btn btn-primary ms-2"
                disabled={currentPage === pagination.totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </AuthGuard>
  );
};

export default Task;
