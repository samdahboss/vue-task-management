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
          @delete="$emit('delete', $event)"
        />
      </template>
    </v-list>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue';

export default {
  name: 'TaskList',
  components: {
    TaskItem
  },
  props: {
    tasks: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-completion', 'edit', 'delete', 'new-task']
}
</script>

<style scoped>
.v-list-item__prepend {
  align-self: center;
}
</style>
