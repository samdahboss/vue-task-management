import { defineStore } from "pinia";
import taskService from "@/services/taskService";

const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [],
    task: null,
  }),

  actions: {
    async fetchTasks() {
      try {
        this.tasks = await taskService.getTasks();
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    },

    async fetchTasksByUserId(userId) {
      try {
        this.tasks = await taskService.getTasksByUserId(userId);
      } catch (error) {
        console.error("Error fetching tasks by user ID:", error);
      }
    },
    async fetchTaskById(taskId) {
      try {
        this.task = await taskService.getTaskById(taskId);
      } catch (error) {
        console.error("Error fetching task by ID:", error);
      }
    },

    async createTask(task) {
      try {
        const response = await taskService.createTask(task);
        return response;
      } catch (error) {
        console.error("Error creating task:", error);
      }
    },

    async updateTask(taskId, task) {
      try {
        const response = await taskService.updateTask(taskId, task);
        return response;
      } catch (error) {
        console.error("Error updating task:", error);
      }
    },

    async deleteTask(taskId) {
      try {
        const response = await taskService.deleteTask(taskId);
        return response;
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    },
  },
});

export default useTaskStore;    