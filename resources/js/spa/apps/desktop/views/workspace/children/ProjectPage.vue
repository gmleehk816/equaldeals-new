<template>
    <div class="custom flex min-h-screen bg-gray-100">
        <aside class="w-64 bg-white shadow-md p-6">
            <h1 class="text-2xl font-bold mb-6">Projects</h1>

            <nav class="space-y-2">
                <button 
                    @click="activeTab = 'list'"
                    :class="navClass('list')"
                >
                    📁 All Projects
                </button>

                <button 
                    @click="openProjectForm(false)"
                    class="block w-full text-left px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                    ➕ Create Project
                </button>

                <button :class="navClass('tasks')">
                    📌 Tasks
                </button>

                <button :class="navClass('team')">
                    👥 Team Members
                </button>

                <button :class="navClass('settings')">
                    ⚙️ Project Settings
                </button>
            </nav>
        </aside>
        <main class="flex-1 p-10">
 
             <div class="w-full max-w-1xl grid grid-cols-1 md:grid-cols-1 gap-2" v-if="loading">
                <SkeletonLoader width="50%" height="15" margin="5" />
                <SkeletonLoader width="70%" height="15" margin="5" />
                <SkeletonLoader
                    width="100%"
                    height="15"
                    margin="5"
                    v-for="i in 7"
                    :key="i"
                />
            </div>
            <div v-if="activeTab === 'list' && loading === false">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-3xl font-bold mb-6">
                        All Projects
                    </h2>
                    <router-link to="/my-workspace">Go to Workspace</router-link>
                </div>
                <div 
                    v-if="projects.length === 0" 
                    class="text-center text-gray-500 mt-20 text-lg"
                >
                    No Projects Found
                </div>

                <table 
                    v-if="projects.length > 0"
                    class="w-full bg-white rounded-xl shadow overflow-hidden"
                >
                    <thead class="bg-gray-200 text-left">
                        <tr>
                            <th class="p-4 font-semibold">Project Name</th>
                            <th class="p-4 font-semibold">Start Date</th>
                            <th class="p-4 font-semibold">End Date</th>
                            <th class="p-4 font-semibold">Description</th>
                            <th class="p-4 font-semibold">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr 
                            v-for="p in projects" 
                            :key="p.id"
                            class="border-b hover:bg-gray-50"
                        >
                            <td class="p-4">{{ p.name }}</td>
                            <td class="p-4">{{ p.start_date }}</td>
                            <td class="p-4">{{ p.end_date }}</td>
                            <td class="p-4 text-gray-600">{{ p.description }}</td>

                            <td class="p-4 flex gap-3">
                                <button 
                                    @click="openEditProjectForm(p)"
                                    class="text-blue-600 hover:underline"
                                >
                                    Edit
                                </button>

                                <button 
                                    @click="deleteProject(p.id)"
                                    class="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </main>

        <div 
            v-if="showForm"
            class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
            <div class="bg-white w-full max-w-lg p-6 rounded-xl shadow-lg">

                <h2 class="text-2xl font-bold mb-4">
                    {{ editingProject ? "Edit Project" : "Create Project" }}
                </h2>

                <label class="block font-medium mb-1">Project Name</label>
                <input 
                    type="text"
                    v-model="form.name"
                    class="w-full border rounded-lg p-2 mb-4"
                />

                <label class="block font-medium mb-1">Start Date</label>
                <input 
                    type="date"
                    v-model="form.start_date"
                    class="w-full border rounded-lg p-2 mb-4"
                />

                <label class="block font-medium mb-1">End Date</label>
                <input 
                    type="date"
                    v-model="form.end_date"
                    class="w-full border rounded-lg p-2 mb-4"
                />

                <label class="block font-medium mb-1">Description</label>
                <textarea 
                    rows="3"
                    v-model="form.description"
                    class="w-full border rounded-lg p-2 mb-4"
                ></textarea>

                <div class="flex justify-end gap-3 mt-4">
                    <button 
                        @click="closeForm"
                        class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <SpinnerLoad v-if="isSubmitting"></SpinnerLoad>
                    <div v-else>
                        <button @click="updateProject" class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700" v-if="isEditing">
                            Update
                        </button>
                        <button @click="saveProject" class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700" v-else>
                            Save
                        </button>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import SpinnerLoad from '@D/components/skeleton/SpinnerLoad.vue';
import SkeletonLoader from '@D/components/skeleton/SkeletonLoader.vue';
export default {
    components: {
        SpinnerLoad,
        SkeletonLoader
    },
    data() {
        return {
            activeTab: "list",

            projects: [],

            showForm: false,
            editingProject: null,
            loading: false,
            isSubmitting: false,
            isEditing: false,

            form: {
                workspace_id:null,
                user_id:null,
                edit_id:null,
                name: "",
                start_date: "",
                end_date: "",
                description: ""
            }
        };
    },

    methods: {
        navClass(tab) {
            return [
                "block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100",
                this.activeTab === tab ? "bg-gray-200 font-semibold" : "text-gray-700"
            ];
        },

        openProjectForm(project = null) {
            this.editingProject = project;

            if (project) {
                this.form = JSON.parse(JSON.stringify(project));
            } else {
                this.form = { name: "", description: "" };
            }
             this.isEditing = false;
            this.showForm = true;
        },

        openEditProjectForm(project = null) {
            this.editingProject = project;
            this.form = JSON.parse(JSON.stringify(project));
            console.log("Editing project:", this.form);
            this.isEditing = true;
            this.showForm = true;
        },

        closeForm() {
            this.showForm = false;
        },

        async saveProject() {
            // if (!this.form.name) {
            //     alert("Project name is required");
            //     return;
            // }

            let auth_user = JSON.parse(localStorage.getItem('auth_user'));
            this.form.workspace_id = this.$route.params.workspace_id;
            this.form.user_id = auth_user.id;

            this.isSubmitting = true;
            try {
                await axios.post('/api/project/store', this.form);
                
            } catch(error) {
                console.error("Error adding workspace:", error);
                // Optionally show a user friendly message here
            } finally {
                this.isSubmitting = false;
                this.closeForm();
                await this.getAllProjects();
            }

        },
        async updateProject(){
            
            this.isSubmitting = true;
            try {
                await axios.post('/api/project/update', this.form);

            } catch(error) {
                console.error("Error adding workspace:", error);
                // Optionally show a user friendly message here
            } finally {
                this.isSubmitting = false;
                this.isEditing = false;
                this.closeForm();
                await this.getAllProjects();
            }
        },

        async deleteProject(id) {
            //this.projects = this.projects.filter(p => p.id !== id);
             if (!confirm("Are you sure you want to delete this project?")) return;
             await axios.delete(`/api/project/delete/${id}`)
            .then(response => {
               this.getAllProjects();
            })
            .catch(error => {
                console.error("Error deleting workspace:", error);
            });
        },
        async getAllProjects(){
            this.loading = true;
            await axios.get('/api/project/get/all/'+this.$route.params.workspace_id)
            .then((response) => {
                this.projects = response.data.data;
                this.loading = false;
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
            });
        }
    },
    mounted() {
        this.getAllProjects();
    }
};
</script>

<style scoped>
.left-page-offset {
  margin-left: 250px;
}
.custom {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99999999;
  background-color: #f8f8f8;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
