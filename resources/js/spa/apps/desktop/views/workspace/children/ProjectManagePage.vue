<template>
    <div class="custom flex">
        <aside class="w-64 bg-white border-r h-full shadow-lg p-5">
            <h2 class="text-xl font-bold mb-6">{{ project.name }}</h2>
            <nav class="space-y-3">

                <button 
                    class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
                    :class="menu === 'overview' ? 'bg-blue-50 text-blue-600' : ''"
                    @click="menu = 'overview'"
                >
                    Overview
                </button>

                <button 
                    class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
                    :class="menu === 'tasks' ? 'bg-blue-50 text-blue-600' : ''"
                    @click="menu = 'tasks'"
                >
                    All Tasks
                </button>

                <button 
                    @click="openTaskForm()"
                    class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
                >
                    + Create Task
                </button>

                <button 
                    class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
                    :class="menu === 'completed' ? 'bg-blue-50 text-blue-600' : ''"
                    @click="menu = 'completed'"
                >
                    Completed Tasks
                </button>

                <hr class="my-4">

                <button 
                    class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
                    :class="menu === 'members' ? 'bg-blue-50 text-blue-600' : ''"
                    @click="menu = 'members'"
                >
                    Members
                </button>

            </nav>
        </aside>

        <main class="flex-1 p-8 overflow-y-auto">
            <div v-if="menu === 'overview'">
                <h1 class="text-3xl font-bold">Project Overview</h1>
                <p class="text-gray-600 mt-2">{{ project.description }}</p>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div class="p-5 bg-white shadow rounded-xl border">
                        <h3 class="text-lg font-semibold">Total Tasks</h3>
                        <p class="text-2xl font-bold mt-2">{{ tasks.length }}</p>
                    </div>

                    <div class="p-5 bg-white shadow rounded-xl border">
                        <h3 class="text-lg font-semibold">Completed</h3>
                        <p class="text-2xl font-bold mt-2">
                            {{ completedTasks }}
                        </p>
                    </div>

                    <div class="p-5 bg-white shadow rounded-xl border">
                        <h3 class="text-lg font-semibold">Pending</h3>
                        <p class="text-2xl font-bold mt-2">
                            {{ pendingTasks }}
                        </p>
                    </div>
                </div>
            </div>

            <div v-if="menu === 'tasks'">
                <h1 class="text-2xl font-bold mb-4">All Tasks</h1>

                <table class="w-full bg-white border rounded-xl shadow">
                    <thead class="bg-gray-100 text-left text-sm font-semibold">
                        <tr>
                            <th class="px-4 py-3">Task</th>
                            <th class="px-4 py-3">Assigned</th>
                            <th class="px-4 py-3">Priority</th>
                            <th class="px-4 py-3">Due</th>
                            <th class="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="task in tasks" :key="task.id" class="border-b hover:bg-gray-50">
                            <td class="px-4 py-3 font-medium">{{ task.title }}</td>
                            <td class="px-4 py-3">{{ task.assignedTo }}</td>
                            <td class="px-4 py-3">
                                <span 
                                    class="px-2 py-1 rounded text-xs"
                                    :class="priorityClass(task.priority)"
                                >
                                    {{ task.priority }}
                                </span>
                            </td>
                            <td class="px-4 py-3">{{ task.dueDate }}</td>

                            <td class="px-4 py-3 text-right space-x-3">
                                <button @click="openTaskForm(task)" class="text-blue-600">Edit</button>
                                <button @click="deleteTask(task.id)" class="text-red-600">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div v-if="tasks.length === 0" class="text-center mt-10 text-gray-500">
                    No tasks found
                </div>
            </div>

            <div v-if="menu === 'completed'">
                <h1 class="text-2xl font-bold mb-4">Completed Tasks</h1>

                <div 
                    v-for="task in tasks.filter(t => t.completed)" 
                    :key="task.id"
                    class="bg-white border p-5 rounded-xl shadow mb-3"
                >
                    {{ task.title }}
                </div>

                <div v-if="completedTasks === 0" class="text-gray-500">
                    No completed tasks
                </div>
            </div>

            <div v-if="menu === 'members'">
                <h1 class="text-2xl font-bold mb-4">Project Members</h1>

                <ul class="space-y-3">
                    <li 
                        v-for="m in members"
                        :key="m"
                        class="p-3 bg-white border rounded-lg shadow"
                    >
                        {{ m }}
                    </li>
                </ul>
            </div>

            <div v-if="menu === 'settings'">
                <h1 class="text-2xl font-bold mb-4">Project Settings</h1>

                <p class="text-gray-600">More settings can be added...</p>
            </div>


        </main>

        <div v-if="showForm" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div class="bg-white w-full max-w-lg p-6 rounded-2xl shadow-xl">

                <h2 class="text-2xl font-bold mb-4">
                    {{ editingTask ? "Edit Task" : "Create Task" }}
                </h2>
                <label class="block font-medium mb-1">Title</label>
                <input 
                    type="text"
                    v-model="form.title"
                    class="w-full border rounded-lg p-2 mb-4"
                />

                <label class="block font-medium mb-1">Description</label>
                <textarea 
                    class="w-full border rounded-lg p-2 mb-4"
                    rows="3"
                    v-model="form.description"
                ></textarea>

                <label class="block font-medium mb-1">Priority</label>
                <select v-model="form.priority" class="w-full border rounded-lg p-2 mb-4">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <label class="block font-medium mb-1">Due Date</label>
                <input 
                    type="date"
                    v-model="form.dueDate"
                    class="w-full border rounded-lg p-2 mb-4"
                />

                <label class="block font-medium mb-1">Assign To</label>
                <select v-model="form.assignedTo" class="w-full border rounded-lg p-2 mb-4">
                    <option v-for="m in members" :key="m" :value="m">{{ m }}</option>
                </select>

                <label class="block font-medium mb-2">Checklist</label>

                <div class="space-y-2 mb-4">
                    <div 
                        v-for="(item, index) in form.checklist" 
                        :key="index"
                        class="flex gap-2"
                    >
                        <input 
                            type="text"
                            v-model="item.text"
                            class="flex-1 border rounded-lg p-2"
                        />
                        <button 
                            @click="form.checklist.splice(index, 1)"
                            class="text-red-600 text-sm"
                        >
                            X
                        </button>
                    </div>

                    <button 
                        class="text-blue-600 text-sm hover:underline"
                        @click="addChecklistItem"
                    >
                        + Add Checklist Item
                    </button>
                </div>

                <!-- Buttons -->
                <div class="flex justify-end gap-3 mt-4">
                    <button 
                        @click="closeForm"
                        class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                    >
                        Cancel
                    </button>

                    <button 
                        @click="saveTask"
                        class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Save Task
                    </button>
                </div>

            </div>
        </div>


    </div>
</template>



<script>
export default {
    data() {
        return {
            menu: "overview",

            project: {
                name: "Project Alpha",
                description: "This is your project description."
            },

            members: ["Bilal", "Ali", "Hina"],

            tasks: [],

            showForm: false,
            editingTask: null,

            form: {
                title: "",
                description: "",
                priority: "medium",
                dueDate: "",
                assignedTo: "",
                checklist: []
            }
        };
    },

    computed: {
        completedTasks() {
            return this.tasks.filter(t => t.completed).length;
        },
        pendingTasks() {
            return this.tasks.filter(t => !t.completed).length;
        }
    },

    methods: {
        priorityClass(priority) {
            return {
                "bg-red-100 text-red-600": priority === "high",
                "bg-yellow-100 text-yellow-600": priority === "medium",
                "bg-green-100 text-green-600": priority === "low",
            };
        },

        openTaskForm(task = null) {
            this.editingTask = task;

            this.menu = "tasks";

            if (task) {
                this.form = JSON.parse(JSON.stringify(task));
            } else {
                this.form = {
                    title: "",
                    description: "",
                    priority: "medium",
                    dueDate: "",
                    assignedTo: "",
                    checklist: []
                };
            }

            this.showForm = true;
        },

        closeForm() {
            this.showForm = false;
        },

        addChecklistItem() {
            this.form.checklist.push({ text: "", done: false });
        },

        saveTask() {
            if (!this.form.title) return alert("Title required");

            if (this.editingTask) {
                Object.assign(this.editingTask, this.form);
            } else {
                this.tasks.push({
                    id: Date.now(),
                    completed: false,
                    ...this.form
                });
            }

            this.closeForm();
        },

        deleteTask(id) {
            this.tasks = this.tasks.filter(t => t.id !== id);
        }
    }
};
</script>
<style scoped>
.custom {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #f8f9fa;
  z-index: 99999999;
  overflow: hidden;
}
</style>
