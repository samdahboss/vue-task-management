<template>
  <div>
    <v-row class="mb-6">
      <v-col cols="12">
        <h2 class="text-h5 font-weight-bold mb-4">Task Analytics</h2>
        <p class="text-subtitle-1 text-grey mb-6">
          View your task performance and completion statistics
        </p>
      </v-col>
    </v-row>

    <!-- Task Distribution Chart -->
    <v-card class="mb-6">
      <v-card-title class="pb-0">Task Distribution</v-card-title>
      <v-card-text>
        <div class="d-flex flex-column align-center">
          <v-sheet class="ma-2 pa-2" width="300" height="300" style="position: relative">
            <div class="chart-container">
              <!-- Placeholder for the chart -->
              <div class="pie-chart">
                <div 
                  v-for="(segment, index) in chartSegments" 
                  :key="index"
                  class="pie-segment"
                  :style="{ 
                    '--value': segment.percentage, 
                    '--start': segment.start,
                    '--color': segment.color
                  }"
                ></div>
                <div class="pie-center">
                  <span class="text-h4">{{ totalTasks }}</span>
                  <span class="text-caption">Total Tasks</span>
                </div>
              </div>
            </div>
          </v-sheet>

          <div class="d-flex flex-wrap justify-center">
            <div
              v-for="(item, index) in chartLegend"
              :key="index"
              class="ma-2 d-flex align-center"
            >
              <v-avatar size="12" :color="item.color" class="mr-2"></v-avatar>
              <span>{{ item.label }}: {{ item.value }}</span>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>

    <!-- Progress Timeline -->
    <v-card class="mb-6">
      <v-card-title class="pb-0">Task Completion Timeline</v-card-title>
      <v-card-text>
        <v-timeline>
          <v-timeline-item
            v-for="(task, i) in recentlyCompletedTasks"
            :key="i"
            :dot-color="getTimelineColor(i)"
            size="small"
          >
            <template v-slot:opposite>
              <div class="text-caption">{{ formatDate(task.dueDate) }}</div>
            </template>
            <div>
              <div class="text-body-2 font-weight-bold mb-1">{{ task.title }}</div>
              <div class="text-caption text-grey">{{ task.description }}</div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>

    <!-- Task Priority Distribution -->
    <v-card>
      <v-card-title class="pb-0">Task Status</v-card-title>
      <v-card-text>
        <v-row>
          <v-col 
            v-for="(stat, index) in taskStats" 
            :key="index" 
            cols="12" 
            sm="6" 
            md="3"
          >
            <v-card :color="stat.color" dark flat>
              <v-card-text>
                <div class="text-h5 mb-2">{{ stat.value }}</div>
                <div class="text-body-2">{{ stat.label }}</div>
                <v-progress-linear
                  :value="(stat.value / totalTasks) * 100"
                  height="4"
                  color="white"
                  class="mt-2"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "AnalyticsView",
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  computed: {
    totalTasks() {
      return this.tasks.length;
    },
    completedTasks() {
      return this.tasks.filter(task => task.completed).length;
    },
    pendingTasks() {
      return this.tasks.filter(task => !task.completed).length;
    },
    overdueTasks() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return this.tasks.filter(task => {
        const dueDate = new Date(task.dueDate);
        return !task.completed && dueDate < today;
      }).length;
    },
    todayTasks() {
      const today = new Date().toISOString().split('T')[0];
      return this.tasks.filter(task => 
        task.dueDate === today && !task.completed
      ).length;
    },
    taskStats() {
      return [
        { label: "Completed", value: this.completedTasks, color: "green" },
        { label: "Pending", value: this.pendingTasks, color: "blue" },
        { label: "Overdue", value: this.overdueTasks, color: "red" },
        { label: "Due Today", value: this.todayTasks, color: "orange" }
      ];
    },
    chartSegments() {
      let currentStart = 0;
      const segments = [];
      
      if (this.totalTasks === 0) {
        return [{ percentage: 100, start: 0, color: 'grey' }];
      }
      
      // Completed
      if (this.completedTasks > 0) {
        const percentage = (this.completedTasks / this.totalTasks) * 100;
        segments.push({ percentage, start: currentStart, color: 'green' });
        currentStart += percentage;
      }
      
      // Overdue
      if (this.overdueTasks > 0) {
        const percentage = (this.overdueTasks / this.totalTasks) * 100;
        segments.push({ percentage, start: currentStart, color: 'red' });
        currentStart += percentage;
      }
      
      // Due Today
      if (this.todayTasks > 0) {
        const percentage = (this.todayTasks / this.totalTasks) * 100;
        segments.push({ percentage, start: currentStart, color: 'orange' });
        currentStart += percentage;
      }
      
      // Remaining pending
      const remainingPending = this.pendingTasks - this.overdueTasks - this.todayTasks;
      if (remainingPending > 0) {
        const percentage = (remainingPending / this.totalTasks) * 100;
        segments.push({ percentage, start: currentStart, color: 'blue' });
      }
      
      return segments;
    },
    chartLegend() {
      return [
        { label: "Completed", value: this.completedTasks, color: "green" },
        { label: "Overdue", value: this.overdueTasks, color: "red" },
        { label: "Due Today", value: this.todayTasks, color: "orange" },
        { label: "Upcoming", value: this.pendingTasks - this.overdueTasks - this.todayTasks, color: "blue" }
      ];
    },
    recentlyCompletedTasks() {
      return [...this.tasks]
        .filter(task => task.completed)
        .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
        .slice(0, 5);
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    getTimelineColor(index) {
      const colors = ['green', 'green-darken-1', 'green-darken-2', 'green-darken-3', 'green-darken-4'];
      return colors[index % colors.length];
    }
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pie-chart {
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
}

.pie-segment {
  --a: calc(var(--start) * 3.6deg);
  --b: calc((var(--start) + var(--value)) * 3.6deg);
  
  position: absolute;
  width: 100%;
  height: 100%;
  transform: rotate(var(--a));
  background: conic-gradient(
    var(--color) calc(var(--value) * 3.6deg),
    transparent 0
  );
}

.pie-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
</style>
