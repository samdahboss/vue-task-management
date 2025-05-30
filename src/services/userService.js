const API_URL = import.meta.env.BASE_API_URL || "http://localhost:3000";

export default {
  // User management methods
  async getUsers() {
    const response = await fetch(`${API_URL}/users`);
    return response.json();
  },

  // Fetch a single user by ID
  async getUser(id) {
    const response = await fetch(`${API_URL}/users?id=${id}`);
    return response.json();
  },

  // Update a user by ID
  async createUser(user) {
    const users = await this.getUsers();
    
    const existingUser = users.find((u) => u.email === user.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const userLength = users.length;
    user.id = userLength > 0 ? users[userLength - 1].id + 1 : 1;

    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return response.json();
  },
};
