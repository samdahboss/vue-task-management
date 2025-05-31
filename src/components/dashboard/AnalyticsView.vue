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
          <div style="position: relative; height: 300px; width: 300px">
            <Pie v-if="totalTasks > 0" :data="chartData" :options="chartOptions" />
            <div v-else class="d-flex justify-center align-center" style="height: 300px">
              <v-icon size="64" color="grey-lighten-1">mdi-clipboard-text</v-icon>
              <p class="text-h6 text-grey ml-4">No tasks available</p>
            </div>
          </div>

          <div class="d-flex flex-wrap justify-center mt-4">
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
    <!-- Task Completion Timeline -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="mb-6" height="100%">
          <v-card-title class="pb-0">Task Completion Timeline</v-card-title>
          <v-card-text>
            <div v-if="recentlyCompletedTasks.length > 0">
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
            </div>
            <div v-else class="d-flex justify-center align-center" style="height: 200px">
              <v-icon size="40" color="grey-lighten-1">mdi-check-circle-outline</v-icon>
              <p class="text-body-1 text-grey ml-4">No completed tasks yet</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="mb-6" height="100%">
          <v-card-title class="pb-0">Task Completion Trend</v-card-title>
          <v-card-text>
            <div style="position: relative; height: 250px">
              <Line
                v-if="completionTrendData.datasets[0].data.length > 0"
                :data="completionTrendData"
                :options="lineChartOptions"
              />
              <div
                v-else
                class="d-flex justify-center align-center"
                style="height: 200px"
              >
                <v-icon size="40" color="grey-lighten-1">mdi-chart-line</v-icon>
                <p class="text-body-1 text-grey ml-4">
                  No data available for trend analysis
                </p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Pie, Line } from "vue-chartjs";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

export default {
  name: "AnalyticsView",
  components: {
    Pie,
    Line,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  computed: {
    totalTasks() {
      return this.tasks.length;
    },
    completedTasks() {
      return this.tasks.filter((task) => task.completed).length;
    },
    pendingTasks() {
      return this.tasks.filter((task) => !task.completed).length;
    },
    overdueTasks() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return this.tasks.filter((task) => {
        const dueDate = new Date(task.dueDate);
        return !task.completed && dueDate < today;
      }).length;
    },
    todayTasks() {
      const today = new Date().toISOString().split("T")[0];
      return this.tasks.filter((task) => task.dueDate === today && !task.completed)
        .length;
    },
    taskStats() {
      return [
        { label: "Completed", value: this.completedTasks, color: "green" },
        { label: "Pending", value: this.pendingTasks, color: "blue" },
        { label: "Overdue", value: this.overdueTasks, color: "red" },
        { label: "Due Today", value: this.todayTasks, color: "orange" },
      ];
    },
    chartData() {
      return {
        labels: ["Completed", "Overdue", "Due Today", "Upcoming"],
        datasets: [
          {
            backgroundColor: ["#4CAF50", "#F44336", "#FF9800", "#2196F3"],
            data: [
              this.completedTasks,
              this.overdueTasks,
              this.todayTasks,
              this.pendingTasks - this.overdueTasks - this.todayTasks,
            ],
          },
        ],
      };
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.formattedValue || "";
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((context.raw / total) * 100);
                return `${label}: ${value} (${percentage}%)`;
              },
            },
          },
        },
      };
    },
    chartLegend() {
      return [
        { label: "Completed", value: this.completedTasks, color: "green" },
        { label: "Overdue", value: this.overdueTasks, color: "red" },
        { label: "Due Today", value: this.todayTasks, color: "orange" },
        {
          label: "Upcoming",
          value: this.pendingTasks - this.overdueTasks - this.todayTasks,
          color: "blue",
        },
      ];
    },
    completionTrendData() {
      // Group tasks by month/year and count completed ones
      const completedTasksByDate = {};

      // Get last 6 months
      const dates = [];
      for (let i = 5; i >= 0; i--) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}`;
        dates.push(yearMonth);
        completedTasksByDate[yearMonth] = 0;
      }

      // Count completed tasks by month
      this.tasks.forEach((task) => {
        if (task.completed) {
          const taskDate = new Date(task.dueDate);
          const yearMonth = `${taskDate.getFullYear()}-${String(
            taskDate.getMonth() + 1
          ).padStart(2, "0")}`;
          if (completedTasksByDate[yearMonth] !== undefined) {
            completedTasksByDate[yearMonth]++;
          }
        }
      });

      return {
        labels: dates.map((date) => {
          const [year, month] = date.split("-");
          return new Date(year, month - 1).toLocaleDateString(undefined, {
            month: "short",
            year: "numeric",
          });
        }),
        datasets: [
          {
            label: "Completed Tasks",
            backgroundColor: "rgba(76, 175, 80, 0.2)",
            borderColor: "#4CAF50",
            data: dates.map((date) => completedTasksByDate[date]),
            tension: 0.4,
          },
        ],
      };
    },
    lineChartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      };
    },
    recentlyCompletedTasks() {
      return [...this.tasks]
        .filter((task) => task.completed)
        .sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
        .slice(0, 5);
    },
  },
  methods: {
    formatDate(dateString) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    getTimelineColor(index) {
      const colors = [
        "green",
        "green-darken-1",
        "green-darken-2",
        "green-darken-3",
        "green-darken-4",
      ];
      return colors[index % colors.length];
    },
  },
};
</script>

<style scoped>
.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
