<template>

  <!-- Loading Skeleton -->
  <div v-if="loading" class="mb-4">
    <SkeletonLoader width="50%" height="15" margin="5" />
    <SkeletonLoader width="60%" height="15" margin="5" />
    <SkeletonLoader
      width="100%"
      height="15"
      margin="5"
      v-for="i in 7"
      :key="i"
    />
  </div>

  <!-- Project List -->
  <div v-else class="p-4">

    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold">All Projects</h2>

      <button
        @click="openProjectForm(false)"
        class="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
      >
        ➕ Create Project
      </button>
    </div>

    <!-- No projects -->
    <div v-if="projects.length === 0" class="text-center text-gray-500 py-8">
      No Projects Found
    </div>

    <!-- Table -->
    <div v-if="projects.length > 0" class="bg-white rounded-lg shadow">
      <div class="overflow-x-auto">

        <table class="min-w-full border border-gray-200 rounded-lg shadow-sm">
          <thead class="bg-gray-100 border-b">
            <tr>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">Project Name</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">Start Date</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">End Date</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">Description</th>
              <th class="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="p in projects"
              :key="p.id"
              class="hover:bg-gray-50 border-b last:border-0"
            >
              <td class="px-4 py-3 text-sm text-gray-800">
                <a
                  :href="$router.resolve({ name: 'project_manage_page', params: { project_id: p.id } }).href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-blue-600 hover:underline"
                >
                  {{ p.name }}
                </a>
              </td>

              <td class="px-4 py-3 text-sm text-gray-800">{{ p.start_date }}</td>
              <td class="px-4 py-3 text-sm text-gray-800">{{ p.end_date }}</td>
              <td class="px-4 py-3 text-sm text-gray-800">{{ p.description }}</td>

              <td class="px-4 py-3 text-sm text-gray-800 flex gap-2">
                <button
                  @click="openNewTab(p.id)"
                  class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Details
                </button>

                <button
                  @click="openEditProjectForm(p)"
                  class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>

                <button
                  @click="deleteProject(p.id)"
                  class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>

  </div>

  <!-- MODAL -->
  <div
    v-if="showForm"
    class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
  >
    <div class="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-lg shadow-lg">

      <!-- Modal Header -->
      <div class="flex justify-between items-center border-b px-6 py-4">
        <h5 class="text-lg font-bold">
          {{ editingProject ? "Edit Project" : "Create Project" }}
        </h5>
        <button
          @click="closeForm"
          class="text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
      </div>

      <!-- Modal Body -->
      <div class="px-6 py-4 space-y-4">

        <div>
          <label class="block mb-1 font-medium">Project Name</label>
          <input 
            type="text" 
            v-model="form.name" 
            class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Start Date</label>
          <input 
            type="date" 
            v-model="form.start_date" 
            class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">End Date</label>
          <input 
            type="date" 
            v-model="form.end_date" 
            class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label class="block mb-1 font-medium">Description</label>
          <textarea
            rows="3"
            v-model="form.description"
            class="w-full px-3 py-2 border rounded-md focus:ring focus:ring-blue-300"
          ></textarea>
        </div>

      </div>

      <!-- Modal Footer -->
      <div class="flex justify-end items-center gap-3 border-t px-6 py-4">

        <button
          @click="closeForm"
          class="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>

        <SpinnerLoad v-if="isSubmitting"></SpinnerLoad>

        <button
          v-if="isEditing && !isSubmitting"
          @click="updateProject"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Update
        </button>

        <button
          v-else-if="!isSubmitting"
          @click="saveProject"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>

      </div>

    </div>
  </div>

</template>


<script>
import axios from "axios";
import SpinnerLoad from "@workspace/components/skeleton/SpinnerLoad.vue";
import SkeletonLoader from "@workspace/components/SkeletonLoader.vue";
import workspaceGlobal from "@workspace/config/global.js";

export default {
  components: {
    SpinnerLoad,
    SkeletonLoader,
    workspaceGlobal
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
        workspace_id: null,
        user_id: null,
        edit_id: null,
        name: "",
        start_date: "",
        end_date: "",
        description: "",
      },
    };
  },

  computed: {
    theme() {
      // if (this.$global.theme == "light") return "theme-light";
      // if (this.$global.theme == "dark") return "theme-dark";
      return "theme-light";
    },
    global(){
            return workspaceGlobal;
        }
  },

  watch: {
    $route() {
      this.getAllProjects();
    },
  },

  methods: {
    openNewTab(id) {
        const url = this.$router.resolve({
        name: "project_manage_page",
        params: { project_id: id }
        }).href;
        
        window.open(url, "_blank");
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
      this.isEditing = true;
      this.showForm = true;
    },

    closeForm() {
      this.showForm = false;
    },

    async saveProject() {
      const auth_user = JSON.parse(localStorage.getItem("auth_user"));
      this.form.workspace_id = this.$route.params.workspace_id;
      this.form.user_id = auth_user.id;

      this.isSubmitting = true;

      try {
        await axios.post(this.global.app_url + "/project/store", this.form);
      } finally {
        this.isSubmitting = false;
        this.closeForm();
        this.getAllProjects();
      }
    },

    async updateProject() {
      this.isSubmitting = true;
      try {
        await axios.post(this.global.app_url + "/project/update", this.form);
      } finally {
        this.isSubmitting = false;
        this.isEditing = false;
        this.closeForm();
        this.getAllProjects();
      }
    },

    async deleteProject(id) {
      if (!confirm("Are you sure you want to delete this project?")) return;
      await axios.delete(this.global.app_url + "/project/delete/" + id);
      this.getAllProjects();
    },

    async getAllProjects() {
      this.loading = true;
      try {
        const res = await axios.get(
          this.global.app_url +
            "/project/get/all/" +
            this.$route.params.workspace_id
        );
        this.projects = res.data.data;
      } finally {
        this.loading = false;
      }
    },
  },

  mounted() {
    this.getAllProjects();
  },
};
</script>

<style scoped>

.theme-light {
  background-color: #fff;
  color: #111;
}

.theme-dark {
  background-color: #111;
  color: #fff;
}

/* Ensures modal stays visible when using Vue v-if */
.modal {
  display: block !important;
}
</style>
