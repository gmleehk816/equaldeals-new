<template>
  <div class="custom" :class="theme">
      <div class="grid grid-cols-[20%_80%] gap-2">
        <!-- SIDEBAR -->
        <div class="c-side-bar">
          <!-- Add Workspace Button -->
          <div class="p-3 border-bottom bg-light">
            <h3>Workspace</h3>
            <router-link :to="{ name: 'workspace_home' }" class="text-blue-600 hover:underline mt-3 inline-block">
              Back to Workspaces
            </router-link>
          </div>

          <!-- Loader -->
          <div class="p-3" v-if="loading">
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

          <!-- Workspace List -->
          <div v-else class="">
            <ul class="space-y-2 px-3">
              <li>
                <router-link :to="{ name: 'workspace_projects_page' }" class="font-semibold text-gray-800 hover:text-blue-600">
                  All Projects
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'workspace_member_page' }" class="font-semibold text-gray-800 hover:text-blue-600">
                  Workspace Members
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- MAIN CONTENT -->
        <div>
          <RouterView />
        </div>

      </div>
   
  </div>
</template>

<script>
import axios from 'axios';
import SkeletonLoader from "@workspace/components/SkeletonLoader.vue";
import AddWorkspace from "@workspace/components/workspace/AddWorkspace.vue";
import workspaceGlobal from "@workspace/config/global.js";


export default {
  components: {
    SkeletonLoader,
    AddWorkspace
  },

  data() {
    return {
      loading: false,
      workspaces: [],
      editId: null,
      workspaceConfig: workspaceGlobal, // Available in your component
    };
  },

  computed: {
    theme() {
      // if (this.$global.theme === 'light') return 'theme-light';
      // if (this.$global.theme === 'dark') return 'theme-dark';
      return "theme-light";
    },
    global(){
        return this.workspaceConfig;
    }
  },

  methods: {
  
  },
  mounted() {
  
  }
};
</script>

<style scoped>
.custom {
    position: absolute;
    left: 0; 
    top: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    overflow-y: auto;
}

.theme-light {
  background-color: #ffffff;
  color: #111111;
}

.theme-dark {
  background-color: #121212;
  color: #ffffff;
}

.c-side-bar {
  height: 100vh;
  border-right: 1px solid #dee2e6;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

/* Workspace item UI */
.list-group-item {
  transition: all 0.25s ease-in-out;
  cursor: pointer;
}

.list-group-item:hover {
  background-color: #eef2ff;
  transform: scale(1.02);
}
.active-workspace {
  background-color: #eef2ff;
  transform: scale(1.02);
}
/* Buttons */
.btn-group .btn {
  padding: 3px 6px;
}

/* Sidebar scroll */
.workspace-list {
  overflow-y: auto;
  max-height: calc(100vh - 120px);
}
</style>
