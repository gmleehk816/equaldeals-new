<template>
    <div class="grid grid-cols-1 mt-5">
        <div class="">
            <button class="rounded px-3 py-2 float-end text-white bg-blue-600 cursor-pointer" @click="addForm">Add Task</button>
        </div>
    </div>
    <div class="grid grid-cols-1 mt-3">
        <div class="p-3" v-if="loading">
            <SkeletonLoader
            width="100%"
            height="15"
            margin="5"
            v-for="i in 9"
            :key="i"
            />
        </div>
        <div class="overflow-x-auto" v-else>
            <table class="min-w-full border border-gray-200 rounded-lg shadow-sm">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Task Name</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Assignee</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Priority</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Due Date</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Description</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Action</th>
                    </tr>
                </thead>

                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(value, index) in tasks" :key="index" class="hover:bg-gray-50">

                        <td class="px-4 py-2 text-sm text-gray-800">{{ value.title }}</td>
                        <td class="px-4 py-2 text-sm text-gray-800">
                            <select name="" id="">
                                <option>Select member</option>
                                <option v-for="(member, mindex) in assignees" :key="mindex" :value="member.id" :selected="member.id === value.assignee_id">
                                    {{ member.name }}
                                </option>
                            </select>
                        </td>
                        <td class="px-4 py-2 text-sm text-gray-800">
                            <select name="" id="">
                                <option>Select Priority</option>
                                <option v-for="(priority, pindex) in priorities" :key="pindex" :value="priority.id" :selected="priority.id === value.priority_id">
                                    {{ priority.name }}
                                </option>
                            </select>
                        </td>
                        <td class="px-4 py-2 text-sm text-gray-800">{{ value.due_date }}</td>
                        <td class="px-4 py-2 text-sm text-blue-600">In Progress</td>
                        <td class="px-4 py-2 text-sm text-gray-600">{{ value.description }}</td>
                        <td class="px-4 py-2 flex gap-2">
                            <button class="cursor-pointer px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700" @click="editForm(value.id)">
                                Edit
                            </button>
                            <button class="px-3 py-1 cursor-pointer text-sm bg-red-600 text-white rounded hover:bg-red-700"
                            @click="deleteTask(value.id)"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import workspaceGlobal from "@workspace/config/global.js";
import SkeletonLoader from "@workspace/components/SkeletonLoader.vue";
import { useWorkspaceStore } from "@workspace/stores/workspace.js";

export default {
    components: {
        workspaceGlobal,
        SkeletonLoader
    },
  data() {
    return {
        tasks: [],
        loading: false,
        assignees: [
            { id: 1, name: 'John Doe' },
            { id: 2, name: 'Jane Smith' },
            { id: 3, name: 'Alice Johnson' }
        ],
        priorities: [
            { id: 1, name: 'Low' },
            { id: 2, name: 'Medium' },
            { id: 3, name: 'High' }
        ]
    };
  },
  computed: {
    project_id() {
      return this.$route.params.project_id;
    },
    global(){
        return workspaceGlobal;
    },
    store(){
      const store = useWorkspaceStore();
      return store;
    }
  },
  methods: {
    async getAllTasks() {
      this.loading = true;
      
      // API route: /api/workspace/get/all/{user_id}
      const url = `${this.global.app_url}/task/get/all/${this.project_id}`;

      try {
        const response = await axios.get(url);
        this.tasks = response?.data?.data || [];
        this.store.setTasks(this.tasks);
      } catch (error) {
        console.error('Error fetching task:', error);
      } finally {
        this.loading = false;
      }
    },
    async editForm(id) {
        let url = this.global.app_url+`/task/edit/${id}`;
        await axios.get(url)
        .then(response => {
            this.store.isSaveUpdate = false;
            this.store.setTaskFormData(response?.data?.data);
            this.$router.push({ name: 'project_add_task_page', params: { project_id: this.project_id } });
        })
        .catch(error => {
            console.error('Error loading task:', error);
        });  
    },
    addForm() {
        this.store.isSaveUpdate = true;
        this.store.resetTaskForm();
        this.$router.push({ name: 'project_add_task_page', params: { project_id: this.project_id } }); 
    },
    async deleteTask(id){
        if (!confirm("Are you sure you want to delete this task?")) return;
        const url = `${this.global.app_url}/task/delete/${id}`;
        try {
            await axios.delete(url);
            this.getAllTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    } 
  },
    mounted() {
        this.getAllTasks();
    }
};
</script>
<style scoped>
</style>