<template>
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
    <task-list
      :tasks="filteredTasks"
      :loading="loading"
      @toggle-completion="$emit('toggle-completion', $event)"
      @edit="$emit('edit', $event)"
      @delete="$emit('delete', $event)"
      @new-task="$emit('new-task')"
    />
  </v-container>
</template>

<script>
import TaskList from "./TaskList.vue";

export default {
  name: "TasksView",
  components: {
    TaskList,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["toggle-completion", "edit", "delete", "new-task"],
  data() {
    return {
      activeTab: "all",
      search: "",
    };
  },
  computed: {
    filteredTasks() {
      let filtered = [...this.tasks];

      // Apply tab filter
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Format date as YYYY-MM-DD for consistent comparison
      const getFormattedDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      const todayStr = getFormattedDate(today);

      if (this.activeTab === "today") {
        filtered = filtered.filter((task) => task.dueDate === todayStr);
      } else if (this.activeTab === "upcoming") {
        filtered = filtered.filter((task) => {
          if (task.completed) return false;

          const dueDate = new Date(task.dueDate + "T00:00:00");
          return dueDate > today;
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
  },
};
</script>
