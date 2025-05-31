import { defineStore } from "pinia";
import taskService from "@/services/taskService";

const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [],
    task: null,
    isLoading: false,
  }),

  actions: {
    async fetchTasks() {
      try {
        this.isLoading = true;
        this.tasks = await taskService.getTasks();
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchTasksByUserId(userId) {
      try {
        this.isLoading = true;
        this.tasks = await taskService.getTasksByUserId(userId);
      } catch (error) {
        console.error("Error fetching tasks by user ID:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchTaskById(taskId) {
      try {
        this.isLoading = true;
        this.task = await taskService.getTaskById(taskId);
      } catch (error) {
        console.error("Error fetching task by ID:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async createTask(task) {
      try {
        this.isLoading = true;
        const newTask = await taskService.createTask(task);

        // Update the tasks array with the new task
        this.tasks.push(newTask);

        return newTask;
      } catch (error) {
        console.error("Error creating task:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async updateTask(taskId, task) {
      try {
        this.isLoading = true;
        const updatedTask = await taskService.updateTask(taskId, task);

        // Find and update the task in the array
        const index = this.tasks.findIndex((t) => t.id === taskId);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }

        return updatedTask;
      } catch (error) {
        console.error("Error updating task:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async deleteTask(taskId) {
      try {
        this.isLoading = true;
        await taskService.deleteTask(taskId);

        // Remove the task from the array
        this.tasks = this.tasks.filter((task) => task.id !== taskId);

        return true;
      } catch (error) {
        console.error("Error deleting task:", error);
        return false;
      } finally {
        this.isLoading = false;
      }
    },
  },
});

export default useTaskStore;
