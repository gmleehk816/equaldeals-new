<template>
  <div class="grid grid-cols-[20%_80%] gap-2 custom" :class="theme">
    <!-- Sidebar -->
    <div class="c-side-bar p-0">
      <div class="sidebar-header text-center py-4 border-bottom">
        <h3 class="fw-bold mb-0 font-bold">{{ currentProject.name ?? 'N/A' }}</h3>
      </div>

      <ul class="nav flex-column py-3">
        <li class="nav-item">
          <router-link
            :to="{ name: 'project_checklist_page', params: { project_id } }"
            class="nav-link sidebar-link"
            active-class="active-link"
          >
            <i class="bi bi-ui-checks-grid me-2"></i>
            Checklist
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            :to="{ name: 'project_tasks_page', params: { project_id } }"
            class="nav-link sidebar-link"
            active-class="active-link"
          >
            <i class="bi bi-list-task me-2"></i>
            Tasks
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="member" class="nav-link sidebar-link">
            <i class="bi bi-list-task me-2"></i>
            Team Members
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Page Content -->
    <div class="" :class="theme">
      <RouterView />
    </div>
  </div>
</template>
<script>
import workspaceGlobal from "@workspace/config/global.js";
import axios from "axios";
import { useWorkspaceStore } from "@workspace/stores/workspace.js";

export default {
  components: {
    workspaceGlobal,
  },
  data() {
    return {
      currentProject: "",
    };
  },
  computed: {
    project_id() {
      return this.$route.params.project_id;
    },
    theme() {
      // if (this.$global.theme === 'light') return 'theme-light';
      // if (this.$global.theme === 'dark') return 'theme-dark';
      return "theme-light";
    },
    global() {
      return workspaceGlobal;
    },
    store() {
      const store = useWorkspaceStore();
      return store;
    },
  },
  methods: {
  },
   mounted() {
    this.currentProject = localStorage.getItem('project_' + this.project_id) ? JSON.parse(localStorage.getItem('project_' + this.project_id)) : '';
  },
};
</script>
<style scoped>
/* Full-page container */
.custom {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

/* Sidebar */
.c-side-bar {
  height: 100vh;
  border-right: 1px solid #dee2e6;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
}

/* Sidebar links */
.sidebar-link {
  padding: 12px 18px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: block;
  border-radius: 6px;
  margin: 2px 10px;
}

/* Hover effect */
.sidebar-link:hover {
  background: #dee2e6;
  color: black !important;
}

/* Active link */
.active-link {
  background: #dee2e6;
  color: black !important;
  font-weight: 600;
  border-radius: 6px;
}

.theme-light {
  background-color: #ffffff;
  color: #111111;
}

.theme-dark {
  background-color: #121212;
  color: #ffffff;
}
</style>
