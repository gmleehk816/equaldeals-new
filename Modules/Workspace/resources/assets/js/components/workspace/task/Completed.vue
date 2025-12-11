<template>
    <div class="p-4">
        <div class="shadow-md rounded-xl p-4 border border-gray-200">
            <h3>Completed</h3>
            <div
            v-for="task in tasks"
            :key="task.id"
            class="p-2 mb-2 bg-gray-100 rounded"
            >
            {{ task.title }}
            </div>
            <button
            class="mt-3 text-blue-600 text-sm hover:underline"
            >
            + Add Subtask
            </button>
        </div>
    </div>
</template>
<script>
import { useWorkspaceStore } from "@workspace/stores/workspace.js";
export default {
    
  data() {
    return {
        tasks: [],
    };
  },
  computed: {
    store() {
      return useWorkspaceStore();
    },
    project_id() {
      return this.$route.params.project_id;
    },
    group_id() {
      return this.$route.params.group_id;
    },
  },
  methods: {
    async getStatus() {
        let res = await this.store.getTaskByStatus(this.project_id,this.group_id, 'Completed');
        this.tasks = res;
        console.log("Task ",this.tasks);
    }
  },
  mounted() {
    this.getStatus();
  },
}
</script>