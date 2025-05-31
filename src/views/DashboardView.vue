<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar color="green-darken-1" dark app>
      <v-toolbar-title>Task Management</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar size="40" class="mr-3">
        <v-img
          :src="'https://randomuser.me/api/portraits/men/83.jpg'"
          alt="Avatar"
        ></v-img>
      </v-avatar>
      <div class="d-none d-sm-flex align-center mr-4">
        <div class="text-body-1">{{ user?.name || "User" }}</div>
      </div>
      <v-btn icon class="mr-2">
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <!-- Dashboard Header -->
        <v-row class="mb-6">
          <v-col cols="12" md="8">
            <h1 class="text-h4 font-weight-bold">Dashboard</h1>
            <p class="text-subtitle-1 text-grey">
              Welcome back, {{ user?.name?.split(" ")[0] || "User" }}
            </p>
          </v-col>
          <v-col cols="12" md="4" class="d-flex justify-end align-center">
            <v-btn
              color="green-darken-1"
              prepend-icon="mdi-plus"
              @click="openNewTaskDialog"
              class="text-white"
            >
              New Task
            </v-btn>
          </v-col>
        </v-row>

        <!-- Task Stats Cards -->
        <v-row class="mb-6">
          <v-col cols="12" sm="6" md="3">
            <v-card class="mx-auto" elevation="2">
              <v-card-text class="d-flex flex-column align-center">
                <v-icon size="48" color="green-darken-1" class="mb-2"
                  >mdi-format-list-checks</v-icon
                >
                <span class="text-h4 font-weight-bold">{{ stats.total }}</span>
                <span class="text-subtitle-1 text-grey">Total Tasks</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="mx-auto" elevation="2">
              <v-card-text class="d-flex flex-column align-center">
                <v-icon size="48" color="amber-darken-2" class="mb-2"
                  >mdi-progress-clock</v-icon
                >
                <span class="text-h4 font-weight-bold">{{ stats.inProgress }}</span>
                <span class="text-subtitle-1 text-grey">In Progress</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="mx-auto" elevation="2">
              <v-card-text class="d-flex flex-column align-center">
                <v-icon size="48" color="green" class="mb-2">mdi-check-circle</v-icon>
                <span class="text-h4 font-weight-bold">{{ stats.completed }}</span>
                <span class="text-subtitle-1 text-grey">Completed</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-card class="mx-auto" elevation="2">
              <v-card-text class="d-flex flex-column align-center">
                <v-icon size="48" color="red-darken-1" class="mb-2"
                  >mdi-clock-alert</v-icon
                >
                <span class="text-h4 font-weight-bold">{{ stats.overdue }}</span>
                <span class="text-subtitle-1 text-grey">Overdue</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

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
              <v-container>
                <!-- Task Filters -->
                <v-row class="mb-4">
                  <v-col cols="12" md="8">
                    <v-tabs v-model="activeTab" bg-color="transparent">
                      <v-tab value="all">All</v-tab>
                      <v-tab value="today">Today</v-tab>
                      <v-tab value="upcoming">Upcoming</v-tab>
                      <v-tab value="completed">Completed</v-tab>
                    </v-tabs>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="search"
                      prepend-inner-icon="mdi-magnify"
                      label="Search tasks"
                      single-line
                      hide-details
                      variant="outlined"
                      density="comfortable"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <!-- Task List -->
                <div>
                  <v-list lines="two">
                    <v-list-subheader>Your Tasks</v-list-subheader>

                    <div v-if="loading" class="d-flex justify-center align-center pa-4">
                      <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </div>

                    <div v-else-if="filteredTasks.length === 0" class="text-center pa-4">
                      <v-icon size="64" color="grey-lighten-1">mdi-clipboard-text</v-icon>
                      <p class="text-h6 text-grey">No tasks found</p>
                      <v-btn color="primary" variant="text" @click="openNewTaskDialog"
                        >Create your first task</v-btn
                      >
                    </div>

                    <template v-else>
                      <v-list-item
                        v-for="task in filteredTasks"
                        :key="task.id"
                        :title="task.title"
                        :subtitle="task.description"
                      >
                        <template v-slot:prepend>
                          <v-checkbox-btn
                            :model-value="task.completed"
                            @update:model-value="toggleTaskCompletion(task)"
                            color="green-darken-1"
                          ></v-checkbox-btn>
                        </template>

                        <template v-slot:append>
                          <div class="d-flex align-center">
                            <v-chip size="small" :color="getTaskStatusColor(task)" class="mr-2">
                              {{ getTaskStatus(task) }}
                            </v-chip>
                            <span class="text-caption me-2">{{ formatDate(task.dueDate) }}</span>
                            <v-menu>
                              <template v-slot:activator="{ props }">
                                <v-btn icon variant="text" v-bind="props">
                                  <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                              </template>
                              <v-list>
                                <v-list-item @click="editTask(task)">
                                  <v-list-item-title>Edit</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="deleteTask(task.id)">
                                  <v-list-item-title class="text-red">Delete</v-list-item-title>
                                </v-list-item>
                              </v-list>
                            </v-menu>
                          </div>
                        </template>
                      </v-list-item>
                    </template>
                  </v-list>
                </div>
              </v-container>
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
    </v-main>    <!-- New/Edit Task Dialog -->
    <v-dialog v-model="taskDialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ editMode ? "Edit Task" : "New Task" }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedTask.title"
                  label="Task Title"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="editedTask.description"
                  label="Description"
                  rows="3"
                ></v-textarea>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedTask.dueDate"
                  label="Due Date"
                  type="date"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-switch
                  v-model="editedTask.completed"
                  label="Completed"
                  color="green-darken-1"
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="closeTaskDialog">
            Cancel
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="saveTask"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { useAuthStore } from "@/stores/authStore";
import useTaskStore from "@/stores/taskStore";
import AnalyticsView from "@/components/dashboard/AnalyticsView.vue";

export default {
  components: {
    AnalyticsView
  },
  data() {
    return {
      mainTab: "tasks", // New property for main tabs (tasks/analytics)
      drawer: false,
      user: null,
      activeTab: "all",
      search: "",
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

    filteredTasks() {
      let filtered = [...this.tasks];

      // Apply tab filter
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (this.activeTab === "today") {
        const todayStr = today.toISOString().split("T")[0];
        filtered = filtered.filter((task) => task.dueDate === todayStr);
      } else if (this.activeTab === "upcoming") {
        filtered = filtered.filter((task) => {
          const dueDate = new Date(task.dueDate);
          return dueDate > today && !task.completed;
        });
      } else if (this.activeTab === "completed") {
        filtered = filtered.filter((task) => task.completed);
      }

      // Apply search filter
      if (this.search) {
        const searchLower = this.search.toLowerCase();
        filtered = filtered.filter(
          (task) =>
            task.title.toLowerCase().includes(searchLower) ||
            task.description.toLowerCase().includes(searchLower)
        );
      }

      return filtered;
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

    async saveTask() {
      try {
        if (!this.user || !this.user.id) {
          console.error("User information is missing");
          return;
        }

        if (this.editMode) {
          await this.taskStore.updateTask(this.editedTask);
        } else {
          const newTask = {
            ...this.editedTask,
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
      await this.taskStore.updateTask(updatedTask);
    },

    async deleteTask(taskId) {
      await this.taskStore.deleteTask(taskId);
    },

    formatDate(dateString) {
      const options = { month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },

    getTaskStatus(task) {
      if (task.completed) return "Completed";

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dueDate = new Date(task.dueDate);

      if (dueDate < today) return "Overdue";

      const todayStr = today.toISOString().split("T")[0];
      if (task.dueDate === todayStr) return "Today";

      return "Upcoming";
    },

    getTaskStatusColor(task) {
      if (task.completed) return "green";

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dueDate = new Date(task.dueDate);

      if (dueDate < today) return "red";

      const todayStr = today.toISOString().split("T")[0];
      if (task.dueDate === todayStr) return "amber-darken-2";

      return "blue";
    },

    logout() {
      this.authStore.logout();
      this.$router.push("/login");
    },
  },

  created() {
    this.restoreSession();
    this.fetchTasks();
  },
};
</script>

<style scoped>
.v-list-item__prepend {
  align-self: center;
}
</style>
