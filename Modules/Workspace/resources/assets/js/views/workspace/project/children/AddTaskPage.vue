<template>
    <div class="grid grid-cols-1 p-3 mt-5">
        <h3>Add Task</h3>
    </div>
    <div class="grid grid-cols-1 gap-4 p-3">
        
        <div class="mb-3">
            <label for="taskName" class="block mb-2">Task Name</label>
            <input type="text"  class="w-[50%] px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" id="taskName" placeholder="Enter task name" v-model="store.task_form.title">
        </div>
        <div>
            <label for="taskDue" class="block mb-2">Due Date</label>
            <input type="date" class="w-[50%] px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" id="taskDue" placeholder="Enter due date" v-model="store.task_form.due_date">
        </div>

        <div>
            <label for="taskDue" class="block mb-2">Status</label>
            <select name="" class="w-[50%] px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" v-model="store.task_form.status">
                <option value="">Select Status</option>
                <option v-for="(value, index) in statuses" :key="index" :value="value.name">
                    {{ value.name }}
                </option>
            </select>
        </div>
        <div class="mb-3">
            <label for="taskDescription" class="block mb-2">Task Description</label>
            <textarea class="w-[50%] px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" id="taskDescription" rows="3" placeholder="Enter task description" v-model="store.task_form.description"></textarea>
        </div>
        <div class="">
          <SpinnerLoad v-if="spiner"></SpinnerLoad>
          <button type="button" 
          class="bg-blue-600 p-2 rounded text-white cursor-pointer" @click="saveTask" 
          v-if="spiner == false && store.isSaveUpdate === true">Add Task</button>

          <button type="button" 
          class="bg-blue-600 p-2 rounded text-white cursor-pointer" @click="updateTask" 
          v-if="spiner == false && store.isSaveUpdate === false">Update Task</button>
        </div>
        
        
    </div>
</template>
<script>
import axios from 'axios';
import workspaceGlobal from "@workspace/config/global.js";
import SpinnerLoad from "@workspace/components/skeleton/SpinnerLoad.vue";
import { useWorkspaceStore } from "@workspace/stores/workspace.js";

export default {
  components: {
    workspaceGlobal,
    SpinnerLoad
  },
  data() {
    return {
      spiner: false,
      statuses: [
        { id: 1, name: 'To Do' },
        { id: 2, name: 'In Progress' },
        { id: 4, name: 'In Review' },
        { id: 3, name: 'Completed' }
      ],
    };
  },
  computed: {
    project_id() {
      return this.$route.params.project_id;
    },
    group_id() {
      return this.$route.params.group_id;
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
    saveTask() {
      this.spiner = true;
      const url = `${this.global.app_url}/task/store`;
      axios.post(url, this.store.task_form)
        .then(response => {
          this.spiner = false;
          this.store.resetTaskForm();
          this.$router.push({ name: 'project_tasks_page', params: { project_id: this.project_id } });
        })
        .catch(error => {
          console.error('There was an error adding the task:', error);
          this.spiner = false;
        });
    },
    updateTask() {
      this.spiner = true;
      const url = `${this.global.app_url}/task/update`;
      axios.post(url, this.store.task_form)
        .then(response => {
          this.spiner = false;
          this.$router.push({ name: 'project_tasks_page', params: { project_id: this.project_id } });
        })
        .catch(error => {
          console.error('There was an error adding the task:', error);
          this.spiner = false;
        });
    },
  },
  mounted() {
    this.store.initializeTaskForm(this.project_id, this.group_id);
  }
};
</script>
<style scoped>
</style>