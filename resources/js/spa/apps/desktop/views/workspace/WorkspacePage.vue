<template>
  <div class="custom" :class="theme">
    <div class="container-fluid">
      <div class="row">

        <!-- SIDEBAR -->
        <div class="col-lg-2 p-0 c-side-bar">
          <!-- Add Workspace Button -->
          <div class="p-3 border-bottom bg-light">
            <AddWorkspace ref="childRef" @getAllworkspace="getAllworkspace" />
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
          <div v-else class="workspace-list p-3">
            <ul class="list-group">

              <li
                v-for="(item, index) in workspaces"
                :key="index"
                class="list-group-item d-flex justify-content-between align-items-center mb-2 shadow-sm rounded"
              >
                <router-link
                  :to="{ name: 'project_page', params: { workspace_id: item.id } }"
                  class="text-decoration-none fw-semibold"
                >
                  {{ item.name }}
                </router-link>

                <div class="btn-group">
                  <button
                    @click="openEditModal(item)"
                    class="btn btn-sm btn-outline-primary"
                    title="Edit workspace"
                  >
                    <SvgIcon name="pencil-01" type="solid" classes="size-icon-small" />
                  </button>

                  <button
                    @click="deleteWorkspace(item.id)"
                    class="btn btn-sm btn-outline-danger"
                    title="Delete workspace"
                  >
                    <SvgIcon name="x" type="solid" classes="size-icon-small" />
                  </button>
                </div>
              </li>

            </ul>
          </div>
        </div>

        <!-- MAIN CONTENT -->
        <div class="col-lg-10 p-4">
          <RouterView />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import SkeletonLoader from "@D/components/skeleton/SkeletonLoader.vue";
import AddWorkspace from "@D/components/workspace/AddWorkspace.vue";


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
    };
  },

  computed: {
    theme() {
      if (this.$global.theme === 'light') return 'theme-light';
      if (this.$global.theme === 'dark') return 'theme-dark';
    },
    global(){
        return this.$global;
    }
  },

  methods: {
    openEditModal(item) {
      this.$refs.childRef.isEditing = true;
      this.editId = item.id;
      this.$refs.childRef.newWorkspace = {
        edit_id: item.id,
        name: item.name,
        visibility_scope: item.visibility_scope,
        description: item.description
      };
      this.$refs.childRef.showModal = true;
    },

    async deleteWorkspace(id) {
      if (!confirm("Are you sure you want to delete this workspace?")) return;

      let url = `${this.$global.app_url}/workspace/delete/${id}`;

      try {
        await axios.delete(url);
        this.getAllworkspace();
      } catch (error) {
        console.error("Error deleting workspace:", error);
      }
    },

    async getAllworkspace() {

      this.loading = true;

      const url = this.$global.app_url+'/workspace/get/all/'+JSON.parse(localStorage.getItem('auth_user')).id;

      try {
        const response = await axios.get(url);
        this.workspaces = response?.data?.data || [];
      } catch (error) {
        console.error('Error fetching workspaces:', error);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.getAllworkspace();
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
