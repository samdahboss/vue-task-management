<template>
  <v-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    max-width="500px"
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ isEdit ? "Edit Task" : "New Task" }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="taskData.title"
                label="Task Title"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="taskData.description"
                label="Description"
                rows="3"
              ></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="taskData.dueDate"
                label="Due Date"
                type="date"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-switch
                v-model="taskData.completed"
                label="Completed"
                color="green-darken-1"
              ></v-switch>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="cancel"> Cancel </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "TaskDialog",
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    task: {
      type: Object,
      default: () => ({
        title: "",
        description: "",
        dueDate: new Date().toISOString().substr(0, 10),
        completed: false,
      }),
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "save", "cancel"],
  data() {
    return {
      taskData: { ...this.task },
    };
  },
  watch: {
    task: {
      handler(newVal) {
        this.taskData = { ...newVal };
      },
      deep: true,
    },
  },
  methods: {
    save() {
      this.$emit("save", this.taskData);
    },
    cancel() {
      this.$emit("update:modelValue", false);
      this.$emit("cancel");
    },
  },
};
</script>
