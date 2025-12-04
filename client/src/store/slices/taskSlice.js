import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axiosConfig";

// Fetch tasks from API
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (page = 1, { rejectWithValue }) => {
    try {
      const res = await api.get(`/tasks?page=${page}&pageSize=5`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Create a new task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      const res = await api.post("/tasks", taskData);
      return res.data; // new task returned from API
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update a task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/tasks/${id}`, updatedData);
      return res.data; // updated task
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      return taskId; // return deleted id
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    pagination: { currentPage: 1, totalPages: 1, pageSize: 5, totalItems: 0 },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload.tasks;
        state.pagination = action.payload.pagination;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        // Optionally add the new task to the current tasks
        state.tasks.unshift(action.payload);
        state.pagination.totalItems += 1;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
        state.pagination.totalItems -= 1;
      });
  },
});

export default taskSlice.reducer;
