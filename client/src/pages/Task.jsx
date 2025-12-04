import React, { useEffect } from "react";
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

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  const { tasks, pagination, loading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      dispatch(fetchTasks(newPage));
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await dispatch(deleteTask(taskId)).unwrap();
        toast.success(response.message || "Task deleted successfully!");
      } catch (err) {
        console.error("Failed to delete task:", err);
        toast.error(err.message || err || "Failed to delete task!");
      }
    }
  };

  return (
    <AuthGuard>
      <div className="container dashboard-container mt-5">
        <div className="d-flex justify-content-end">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <h2 className="mb-5 text-center">Dashboard</h2>
        <div className="mb-3">
          <button
            className="btn btn-success"
            onClick={() => navigate("/tasks/create")}
          >
            + Create New Task
          </button>
        </div>

        {loading ? (
          <p className="text-center">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-center">No tasks found.</p>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>S.N</th>
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
                        {index +
                          1 +
                          (pagination.currentPage - 1) * pagination.pageSize}
                      </td>
                      <td>{task.title}</td>
                      <td>{task.description}</td>
                      <td>{task.priority}</td>
                      <td>{new Date(task.end_date).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => navigate(`/tasks/edit/${task.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
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

            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-primary me-2"
                disabled={pagination.currentPage === 1}
                onClick={() => handlePageChange(pagination.currentPage - 1)}
              >
                Previous
              </button>
              <span className="align-self-center">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                className="btn btn-primary ms-2"
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() => handlePageChange(pagination.currentPage + 1)}
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
