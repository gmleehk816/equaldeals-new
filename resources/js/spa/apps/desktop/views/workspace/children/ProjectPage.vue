<template>
  <div class="container-fluid py-4">

    <main class="row">
      <div class="col-12">
        
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
        <div v-if="activeTab === 'list' && loading === false">

          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold mb-0">All Projects</h2>
            <button @click="openProjectForm(false)" class="btn btn-primary">
              ➕ Create Project
            </button>
          </div>

          <!-- No projects -->
          <div v-if="projects.length === 0" class="text-center text-muted py-5">
            No Projects Found
          </div>

          <!-- Table -->
          <div v-if="projects.length > 0" class="card shadow-sm">
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                <thead >
                    <tr>
                    <th>Project Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Description</th>
                    <th style="width: 150px;">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="p in projects" :key="p.id">
                    <td>
                        <a 
                            :href="$router.resolve({ name: 'project_manage_page', params: { project_id: p.id } }).href" 
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            {{ p.name }}
                        </a>
                    </td>
                    <td>{{ p.start_date }}</td>
                    <td>{{ p.end_date }}</td>
                    <td>{{ p.description }}</td>

                    <td class="d-flex">
                        <button 
                            class="btn btn-sm btn-outline-primary"
                            @click="openNewTab(p.id)"
                            >
                            Details
                        </button>
                        <button
                        @click="openEditProjectForm(p)"
                        class="btn btn-sm btn-outline-primary"
                        >
                        Edit
                        </button>

                        <button
                        @click="deleteProject(p.id)"
                        class="btn btn-sm btn-outline-danger"
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

      </div>
    </main>

    <!-- MODAL -->
    <div
      v-if="showForm"
      class="modal fade show d-block"
      tabindex="-1"
      style="background: rgba(0, 0, 0, 0.4);"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content" :class="theme">

          <div class="modal-header">
            <h5 class="modal-title">
              {{ editingProject ? "Edit Project" : "Create Project" }}
            </h5>
            <button type="button" class="btn-close" @click="closeForm"></button>
          </div>

          <div class="modal-body">

            <div class="mb-3">
              <label class="form-label">Project Name</label>
              <input type="text" v-model="form.name" class="form-control" />
            </div>

            <div class="mb-3">
              <label class="form-label">Start Date</label>
              <input type="date" v-model="form.start_date" class="form-control" />
            </div>

            <div class="mb-3">
              <label class="form-label">End Date</label>
              <input type="date" v-model="form.end_date" class="form-control" />
            </div>

            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea
                rows="3"
                v-model="form.description"
                class="form-control"
              ></textarea>
            </div>

          </div>

          <div class="modal-footer">
            <button @click="closeForm" class="btn btn-secondary">Cancel</button>

            <SpinnerLoad v-if="isSubmitting"></SpinnerLoad>

            <button
              v-if="isEditing && !isSubmitting"
              @click="updateProject"
              class="btn btn-primary"
            >
              Update
            </button>

            <button
              v-else-if="!isSubmitting"
              @click="saveProject"
              class="btn btn-primary"
            >
              Save
            </button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import SpinnerLoad from "@D/components/skeleton/SpinnerLoad.vue";
import SkeletonLoader from "@D/components/skeleton/SkeletonLoader.vue";

export default {
  components: {
    SpinnerLoad,
    SkeletonLoader,
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
      if (this.$global.theme == "light") return "theme-light";
      if (this.$global.theme == "dark") return "theme-dark";
    },
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
        await axios.post(this.$global.app_url + "/project/store", this.form);
      } finally {
        this.isSubmitting = false;
        this.closeForm();
        this.getAllProjects();
      }
    },

    async updateProject() {
      this.isSubmitting = true;
      try {
        await axios.post(this.$global.app_url + "/project/update", this.form);
      } finally {
        this.isSubmitting = false;
        this.isEditing = false;
        this.closeForm();
        this.getAllProjects();
      }
    },

    async deleteProject(id) {
      if (!confirm("Are you sure you want to delete this project?")) return;
      await axios.delete(this.$global.app_url + "/project/delete/" + id);
      this.getAllProjects();
    },

    async getAllProjects() {
      this.loading = true;
      try {
        const res = await axios.get(
          this.$global.app_url +
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
