<template>
  <div class="grid grid-cols-1 gap-2" :class="theme">
    <!-- Sidebar -->
    <div class="c-side-bar p-0">
      <ul class="flex py-3">
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
          <router-link
            :to="{ name: 'project_boards_page', params: { project_id } }"
            class="nav-link sidebar-link"
            active-class="active-link"
          >
            <i class="bi bi-ui-checks-grid me-2"></i>
            Boards
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'project_backlog_page', params: { project_id } }"
            class="nav-link sidebar-link"
          >
            <i class="bi bi-ui-checks-grid me-2"></i>
            Backlogs
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Page Content -->
    <div class="" :class="theme">
      <RouterView :key="$route.fullPath" />
    </div>
  </div>
</template>
<script>
import workspaceGlobal from "@workspace/config/global.js";
import axios from "axios";
import { useWorkspaceStore } from "@workspace/stores/workspace.js";

export default {
  components: {
    workspaceGlobal
  },
  data() {
    return {
    };
  },
  watch: {
   
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
  },
};
</script>
<style scoped>
/* Full-page container */

/* Sidebar */
.c-side-bar {
  min-height: 100%;
  border-right: 1px solid #dee2e6;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
}

/* Sidebar links */
.sidebar-link {
  padding: 12px 18px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-block;
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
.nav-item {
  margin-bottom: 0.5rem;
}
</style>
