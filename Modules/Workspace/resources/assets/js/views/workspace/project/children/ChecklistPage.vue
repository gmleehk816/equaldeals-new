<template>
  <div class="p-4">
    <!-- TASK CARDS GRID -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      <!-- TASK CARD -->
      <div
        v-for="(task, ti) in tasks"
        :key="ti"
        class="bg-white shadow-md rounded-xl p-4 border border-gray-200"
      >
        <!-- TASK TITLE -->
        <h3 class="font-semibold text-gray-900 text-lg mb-3">
          {{ task.title }}
        </h3>

        <!-- SUBTASKS -->
        <div class="space-y-2">
          <div
            v-for="(sub, si) in task.subtasks"
            :key="si"
            class="flex items-center gap-2"
          >
            <input
              type="checkbox"
              v-model="sub.completed"
              @change="updateSubtask(task, sub)"
              class="h-4 w-4"
            />

            <span
              :class="
                sub.completed
                  ? 'line-through text-gray-400'
                  : 'text-gray-700'
              "
              class="text-sm"
            >
              {{ sub.title }}
            </span>
          </div>
        </div>

        <!-- ADD SUBTASK INPUT -->
        <div class="mt-3" v-if="task.showInput">
          <div class="flex items-center gap-2">
            <input
              v-model="task.newSubtaskTitle"
              @keyup.enter="addSubtask(ti)"
              placeholder="Subtask title"
              class="border rounded px-2 py-1 text-sm flex-1"
            />

            <button
              @click="addSubtask(ti)"
              class="px-2 py-1 bg-blue-500 text-white text-sm rounded"
            >
              Add
            </button>

            <button
              @click="task.showInput = false"
              class="px-2 py-1 bg-gray-300 text-sm rounded"
            >
              x
            </button>
          </div>
        </div>

        <!-- ADD SUBTASK BUTTON -->
        <button
          v-if="!task.showInput"
          @click="task.showInput = true"
          class="mt-3 text-blue-600 text-sm hover:underline"
        >
          + Add Subtask
        </button>
      </div>

    </div>
  </div>
</template>
<script>
import { reactive, onMounted, computed } from "vue";
import { useWorkspaceStore } from "@workspace/stores/workspace.js";
import { useRoute } from "vue-router";
import axios from "axios";
import workspaceGlobal from "@workspace/config/global.js";

export default {
  name: "ChecklistPage",

  setup() {
    const store = useWorkspaceStore();
    const route = useRoute();
    const project_id = computed(() => route.params.project_id);
    const global = workspaceGlobal;

    const tasks = reactive([]);
    const loading = reactive({ value: false });

    // Get all tasks from API
    const getAllTasks = async () => {
      loading.value = true;

      const url = `${global.app_url}/task/get/all/${project_id.value}`;

      try {
        const response = await axios.get(url);
        const fetched = response?.data?.data || [];
        store.setTasks(fetched);

        tasks.length = 0;

        fetched.forEach(task => {
          tasks.push({
            id: task.id,
            title: task.title,
            showInput: false,
            newSubtaskTitle: "",
            subtasks: task.subtasks || [],
          });
        });

      } catch (error) {
        console.error('Error fetching task:', error);
      } finally {
        loading.value = false;
      }
    };

    // ADD SUBTASK
    const addSubtask = (ti) => {
      const task = tasks[ti];
      if (!task.newSubtaskTitle.trim()) return;

      task.subtasks.push({
        id: Date.now(),
        title: task.newSubtaskTitle,
        completed: false,
      });

      task.newSubtaskTitle = "";
      task.showInput = false;

      // TODO: API call to save subtask
    };

    const updateSubtask = (task, subtask) => {
      console.log("Updated:", task.title, subtask.title, subtask.completed);
      // TODO: API call to update subtask status
    };

    onMounted(() => {
      getAllTasks();
    });

    return { tasks, addSubtask, updateSubtask, loading };
  },
};
</script>
