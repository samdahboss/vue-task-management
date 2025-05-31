<template>
  <v-list-item 
    :title="task.title" 
    :subtitle="task.description"
  >
    <template v-slot:prepend>
      <v-checkbox-btn
        :model-value="task.completed"
        @update:model-value="$emit('toggle-completion', task)"
        color="green-darken-1"
      ></v-checkbox-btn>
    </template>

    <template v-slot:append>
      <div class="d-flex align-center">
        <v-chip size="small" :color="getStatusColor(task)" class="mr-2">
          {{ getStatus(task) }}
        </v-chip>
        <span class="text-caption me-2">{{ formatDate(task.dueDate) }}</span>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon variant="text" v-bind="props">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="$emit('edit', task)">
              <v-list-item-title>Edit</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$emit('delete', task.id)">
              <v-list-item-title class="text-red">Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </template>
  </v-list-item>
</template>

<script>
export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  emits: ['toggle-completion', 'edit', 'delete'],
  methods: {
    formatDate(dateString) {
      const options = { month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
      getStatus(task) {
      if (task.completed) return "Completed";

      // Format date as YYYY-MM-DD for consistent comparison
      const getFormattedDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dueDate = new Date(task.dueDate + 'T00:00:00');

      if (dueDate < today) return "Overdue";

      const todayStr = getFormattedDate(today);
      if (task.dueDate === todayStr) return "Today";

      return "Upcoming";
    },

    getStatusColor(task) {
      if (task.completed) return "green";

      // Format date as YYYY-MM-DD for consistent comparison
      const getFormattedDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const dueDate = new Date(task.dueDate + 'T00:00:00');

      if (dueDate < today) return "red";

      const todayStr = getFormattedDate(today);
      if (task.dueDate === todayStr) return "amber-darken-2";

      return "blue";
    }
  }
}
</script>
