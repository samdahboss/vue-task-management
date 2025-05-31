<template>
  <div>
    <v-list lines="two">
      <v-list-subheader>Your Tasks</v-list-subheader>

      <div v-if="loading" class="d-flex justify-center align-center pa-4">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>

      <div v-else-if="tasks.length === 0" class="text-center pa-4">
        <v-icon size="64" color="grey-lighten-1">mdi-clipboard-text</v-icon>
        <p class="text-h6 text-grey">No tasks found</p>
        <v-btn color="primary" variant="text" @click="$emit('new-task')">
          Create your first task
        </v-btn>
      </div>

      <template v-else>
        <task-item
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @toggle-completion="$emit('toggle-completion', $event)"
          @edit="$emit('edit', $event)"
          @delete="$emit('delete', $event)"        />
      </template>
    </v-list>
    
    <!-- Pagination -->
    <div v-if="tasks.length > 0 && totalPages > 1" class="d-flex justify-center align-center pa-4">
      <v-pagination
        v-model="localCurrentPage"
        :length="totalPages"
        :total-visible="5"
        rounded
      ></v-pagination>
    </div>
    
    <!-- Task count information -->
    <div v-if="tasks.length > 0" class="text-caption text-center mt-2 mb-4">
      Showing {{ tasks.length }} of {{ totalItems }} tasks
    </div>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue';

export default {
  name: 'TaskList',
  components: {
    TaskItem
  },  props: {
    tasks: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    totalItems: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPages: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      localCurrentPage: this.currentPage
    }
  },
  watch: {
    currentPage(newValue) {
      this.localCurrentPage = newValue;
    },
    localCurrentPage(newValue) {
      if (newValue !== this.currentPage) {
        this.$emit('change-page', newValue);
      }
    }
  },
  emits: ['toggle-completion', 'edit', 'delete', 'new-task', 'change-page']
}
</script>

<style scoped>
.v-list-item__prepend {
  align-self: center;
}
</style>
