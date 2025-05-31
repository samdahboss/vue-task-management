const API_URL = import.meta.env.BASE_API_URL || "http://localhost:3000";

export default {
  // Task management methods
  // Fetch all tasks
  async getTasks() {
    const response = await fetch(`${API_URL}/tasks`);
    return response.json();
  },

  // Fetch tasks by user ID
  async getTasksByUserId(userId) {
    const response = await fetch(`${API_URL}/tasks?userId=${userId}`);
    return response.json();
  },
  // Fetch a single task by ID
  async getTaskById(taskId) {
    const response = await fetch(`${API_URL}/tasks/${taskId}`);
    if (!response.ok) {
      throw new Error(
        `Error fetching task with ID ${taskId}: ${response.statusText}`
      );
    }
    return response.json();
  },

  // Create a new task
  async createTask(task) {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    return response.json();
  },
  //Update a Specific Task by ID
  async updateTask(taskId, task) {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      throw new Error(
        `Error updating task with ID ${taskId}: ${response.statusText}`
      );
    }
    return response.json();
  },

  //Delete a Specific Task by ID
  async deleteTask(taskId) {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(
        `Error deleting task with ID ${taskId}: ${response.statusText}`
      );
    }
    return response.json();
  },
};
