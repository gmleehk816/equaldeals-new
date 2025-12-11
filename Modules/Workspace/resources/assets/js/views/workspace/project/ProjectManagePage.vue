<template>
  <div class="grid grid-cols-[20%_80%] gap-2 custom" :class="theme">
    <!-- Sidebar -->
    <div class="c-side-bar p-0">
      <div class="sidebar-header p-4" style="border-bottom: 1px solid #dee2e6;">
        <h3 class="fw-bold mb-0 text-center font-bold cursor-pointer">
          <span class="float-left">
            {{ currentProject.name ?? 'N/A' }}
          </span>
          <span class="float-right" @click="toggleBox">
            <svg xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" fill="currentColor" 
            class="w-6 h-6">
            <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            </svg>
          </span>
          <i class="bi bi-caret-down-fill ms-2"></i>
        </h3>
        <div class="grid grid-cols-1 mt-5 p-4 border-b-edge-pr c-dropdown" v-if="toggle">
          <div class="">
            <button class="bg-blue-500 p-2 rounded text-white float-end cursor-pointer" @click="openGroupBox">+ Create Group</button>
          </div>
          <div class="">
            <ul class="c-ul">
              <li v-for="(value, index) in group" :key="index">
                <router-link 
                  :to="{name:'project_group', params: { project_id, group_id: value.id }}"
                  active-class="active-group-link"
                >
                  {{ value.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <li class="nav-item">
        
          <router-link :to="{ name: 'project_member_page' }" class="nav-link sidebar-link">
            <i class="bi bi-list-task me-2"></i>
            Invite Members
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name:'workspace_home'}" class="nav-link sidebar-link">
            <i class="bi bi-list-task me-2"></i>
            Back to workspace
          </router-link>
        </li>
    </div>

    <!-- Page Content -->
    <div class="" :class="theme">
      <RouterView />
    </div>
     <AddProjectGroup v-if="isGroup" :openGroupBox="openGroupBox" :getAllGroups="getAllGroups"></AddProjectGroup> 
  </div>
</template>
<script>
import workspaceGlobal from "@workspace/config/global.js";
import axios from "axios";
import { useWorkspaceStore } from "@workspace/stores/workspace.js";
import AddProjectGroup from "../../../components/workspace/project/AddProjectGroup.vue";

export default {
  components: {
    workspaceGlobal,
    AddProjectGroup
  },
  data() {
    return {
      currentProject: "",
      toggle: false,
      isGroup: false,
      group:[]
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
    toggleBox() {
      this.toggle = !this.toggle;
    },
    openGroupBox() {
      this.isGroup = !this.isGroup;
    },
    async getAllGroups() {
      const url = `${this.global.app_url}/project/group/get/all/${this.project_id}`;
      await axios.get(url)
        .then((response) => {
          this.group = response?.data?.data || [];
        })
        .catch((error) => {
          console.error("Error fetching groups:", error);
        });
    },
  },
   mounted() {
    this.getAllGroups();
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
}

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
.sidebar-header{
  position: relative;
}
.c-dropdown{
  position: absolute;
  width: 100%;
  box-shadow:0 0 10px rgba(0,0,0,0.1);
  background-color: #fff;
  z-index: 9;
}
c-ul{
  list-style-type: none;
  padding: 0;
}
.c-ul li{
  border-bottom: 1px solid #eee;
}
.c-ul li a{
  text-decoration: none;
  color: #333;
  display: block;
  padding: 10px;
  margin-top: 5px;
}
.c-ul li a:hover{
  background-color: #f5f5f5;
}
.active-group-link {
  background-color: #eef2ff;
  color: #3b82f6 !important;
  font-weight: 600;
}
</style>
