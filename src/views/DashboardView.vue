<template>
  <v-app>
    <!-- App Bar -->
    <app-header :user-name="user?.name" @logout="logout" />

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <!-- Dashboard Header -->
        <dashboard-header :user-name="user?.name" @new-task="openNewTaskDialog" />

        <!-- Task Stats Cards -->
        <stat-cards :stats="stats" />

        <!-- Main Dashboard Tabs -->
        <v-card class="mb-6">
          <v-tabs
            v-model="mainTab"
            bg-color="green-darken-1"
            align-tabs="center"
            dark
            slider-color="white"
          >
            <v-tab value="tasks">
              <v-icon start>mdi-format-list-checks</v-icon>
              Tasks
            </v-tab>
            <v-tab value="analytics">
              <v-icon start>mdi-chart-bar</v-icon>
              Analytics
            </v-tab>
          </v-tabs>

          <v-window v-model="mainTab">
            <!-- Tasks Tab -->
            <v-window-item value="tasks">
              <tasks-view
                :tasks="tasks"
                :loading="loading"
                @toggle-completion="toggleTaskCompletion"
                @edit="editTask"
                @delete="deleteTask"
                @new-task="openNewTaskDialog"
              />
            </v-window-item>

            <!-- Analytics Tab -->
            <v-window-item value="analytics">
              <v-container>
                <analytics-view :tasks="tasks" />
              </v-container>
            </v-window-item>
          </v-window>
        </v-card>
      </v-container>
    </v-main>

    <!-- Task Dialog -->
    <task-dialog
      v-model="taskDialog"
      :task="editedTask"
      :is-edit="editMode"
      @save="saveTask"
      @cancel="closeTaskDialog"
    />
  </v-app>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
import useTaskStore from "@/stores/taskStore";
import AppHeader from "@/components/dashboard/AppHeader.vue";
import DashboardHeader from "@/components/dashboard/DashboardHeader.vue";
import StatCards from "@/components/dashboard/StatCards.vue";
import TasksView from "@/components/dashboard/TasksView.vue";
import TaskDialog from "@/components/dashboard/TaskDialog.vue";
import AnalyticsView from "@/components/dashboard/AnalyticsView.vue";

export default {
  components: {
    AppHeader,
    DashboardHeader,
    StatCards,
    TasksView,
    TaskDialog,
    AnalyticsView,
  },
  data() {
    return {
      mainTab: "tasks",
      loading: true,
      taskDialog: false,
      editMode: false,
      editedTask: {
        title: "",
        description: "",
        dueDate: new Date().toISOString().substr(0, 10),
        completed: false,
      },
    };
  },
  computed: {
    user() {
      return this.authStore.user;
    },

    tasks() {
      return this.taskStore.tasks;
    },

    stats() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return {
        total: this.tasks.length,
        completed: this.tasks.filter((task) => task.completed).length,
        inProgress: this.tasks.filter((task) => !task.completed).length,
        overdue: this.tasks.filter((task) => {
          const dueDate = new Date(task.dueDate);
          return !task.completed && dueDate < today;
        }).length,
      };
    },

    authStore() {
      return useAuthStore();
    },

    taskStore() {
      return useTaskStore();
    },
  },
  methods: {
    async fetchTasks() {
      if (!this.user) {
        console.log("No user found, cannot fetch tasks");
        this.loading = false;
        return;
      }

      console.log("Fetching tasks for user:", this.user);
      this.loading = true;
      try {
        // Use the task store to fetch tasks
        await this.taskStore.fetchTasksByUserId(this.user.id);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        this.loading = false;
      }
    },

    async restoreSession() {
      this.loading = true;
      try {
        await this.authStore.restoreSession();

        // Once the session is restored, fetch tasks if we have a user
        if (this.user) {
          await this.fetchTasks();
        }
      } catch (error) {
        console.error("Error restoring session:", error);
      } finally {
        this.loading = false;
      }
    },

    openNewTaskDialog() {
      this.editMode = false;
      this.editedTask = {
        title: "",
        description: "",
        dueDate: new Date().toISOString().substr(0, 10),
        completed: false,
      };
      this.taskDialog = true;
    },

    editTask(task) {
      this.editMode = true;
      this.editedTask = { ...task };
      this.taskDialog = true;
    },

    closeTaskDialog() {
      this.taskDialog = false;
    },

    async saveTask(taskData) {
      try {
        if (!this.user || !this.user.id) {
          console.error("User information is missing");
          return;
        }

        if (this.editMode) {
          await this.taskStore.updateTask(taskData.id, taskData);
        } else {
          const newTask = {
            ...taskData,
            userId: this.user.id,
          };
          await this.taskStore.createTask(newTask);
        }
        this.taskDialog = false;
      } catch (error) {
        console.error("Error saving task:", error);
      }
    },

    async toggleTaskCompletion(task) {
      const updatedTask = { ...task, completed: !task.completed };
      await this.taskStore.updateTask(updatedTask.id, updatedTask);
    },

    async deleteTask(taskId) {
      await this.taskStore.deleteTask(taskId);
    },

    logout() {
      this.authStore.logout();
      this.$router.push("/login");
    },
  },

  created() {
    this.restoreSession();
  },
};
</script>

<style scoped>
/* No specific styles needed here as they've been moved to components */
</style>
