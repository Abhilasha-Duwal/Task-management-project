import React, { useEffect, useState } from "react";
import AuthGuard from "../../components/AuthGuard";
import api from "../../config/axiosConfig";
import "../../styles/Task.css";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 5,
    totalItems: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchTasks = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(
        `/tasks?page=${page}&pageSize=${pagination.pageSize}`,
        { withCredentials: true }
      );

      setTasks(res.data.tasks);
      setPagination(res.data.pagination);
      setLoading(false);
    } catch (err) {
      console.error(
        "Failed to fetch tasks:",
        err.response?.data || err.message
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchTasks(newPage);
    }
  };

  return (
    <AuthGuard>
    <div className="container dashboard-container mt-5">
      <h2 className="mb-4 text-center">Dashboard</h2>

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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
