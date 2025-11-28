<template>
  <div class="custom flex flex-col items-center p-6">

    <!-- Header -->
    <div class="w-full max-w-3xl flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">My Workspaces</h1>
      <router-link to="/home">Go to Home</router-link>
      <button 
        @click="openAddModal()"
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        + Add Workspace
      </button>
    </div>
    <div class="w-full max-w-3xl grid grid-cols-1 md:grid-cols-1 gap-2" v-if="loading">
        <SkeletonLoader width="50%" height="15" margin="5" />
        <SkeletonLoader
            width="100%"
            height="15"
            margin="5"
            v-for="i in 7"
            :key="i"
        />
    </div>
    
    <div class="max-w-3xl w-full" v-else>
    <!-- Workspace Listing -->
        <div class="grid grid-cols-1 md:grid-cols-1 text-center mt-5" v-if="workspaces.length === 0">
            <h2>No Workspace Found!</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
        <div 
            v-for="(item, index) in workspaces" 
            :key="index"
            class="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
        >
            <h2 class="font-semibold text-lg">{{ item.name }}</h2>
            <p class="text-gray-600 text-sm mt-1">{{ item.description }}</p>

            <!-- Actions -->
            <div class="flex justify-between mt-4">
            <router-link 
                :to="`/projects/${item.id}`"
                class="text-blue-600 font-medium hover:underline"
            >
                Open →
            </router-link>

            <div class="flex space-x-3">
                <button
                @click="openEditModal(item)"
                class="text-yellow-600 font-medium hover:underline"
                >
                Edit
                </button>

                <button
                @click="deleteWorkspace(item.id)"
                class="text-red-600 font-medium hover:underline"
                >
                Delete
                </button>
            </div>
            </div>
        </div>
        </div>
    </div>

    <!-- Add/Edit Workspace Modal -->
    <div 
    v-if="showModal" 
    class="fixed inset-0 bg-black/40 flex justify-center items-center"
    >
    <div class="bg-white p-6 rounded-lg w-100 shadow-lg">
        <h2 class="text-xl font-semibold mb-4">{{ isEditing ? "Edit Workspace" : "Create Workspace" }}</h2>

        <input 
        v-model="newWorkspace.name"
        type="text"
        placeholder="Workspace Name"
        class="w-full border px-3 py-2 rounded mb-3"
        />

        <select name="" id="" v-model="newWorkspace.visibility_scope" class="w-full border px-3 py-2 rounded mb-3">
            <option value="" selected>Select Visibility Scope</option>
            <option value="private">Private</option>
            <option value="friends">Friends</option>
            <option value="public">Public</option>
        </select>

        <textarea
        v-model="newWorkspace.description"
        placeholder="Description"
        class="w-full border px-3 py-2 rounded mb-3"
        ></textarea>

        <div class="flex justify-end space-x-2">
        <button 
            @click="showModal = false"
            class="px-3 py-2 bg-gray-300 rounded"
        >
            Cancel
        </button>

        <button
          @click="isEditing ? saveEdit() : addWorkspace()"
          :disabled="isSubmitting"
          :class="[ 'px-3 py-2 rounded', isSubmitting ? 'bg-blue-400 text-white cursor-not-allowed' : 'bg-blue-600 text-white' ]"
        >
          <span v-if="isSubmitting" class="flex items-center">
            <svg class="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            {{ isEditing ? 'Updating...' : 'Saving...' }}
          </span>
          <span v-else>
            {{ isEditing ? "Update" : "Save" }}
          </span>
        </button>
        </div>
    </div>
    </div>
    

  </div>
</template>

<script>
import axios from 'axios';
import SkeletonLoader from "@D/components/skeleton/SkeletonLoader.vue";
export default {
    components: {
        SkeletonLoader
    },
  data() {
    return {
      showModal: false,
      isEditing: false,
      loading: false,
      isSubmitting: false,

      workspaces: [],

      newWorkspace: {
        name: "",
        visibility_scope: "",
        description: "",
      }
    };
  },

methods: {
    openAddModal() {
      this.isEditing = false;
      this.newWorkspace = { name: "", visibility_scope: "", description: "" };
      this.showModal = true;
    },

    openEditModal(item) {
      this.isEditing = true;
      this.editId = item.id;
      this.newWorkspace = { edit_id:item.id,name: item.name,visibility_scope:item.visibility_scope, description: item.description };
      console.log("workspace:"+this.newWorkspace);
      this.showModal = true;
    },

    async addWorkspace() {
      if (!this.newWorkspace.name) return alert("Workspace name is required");

      let auth_user = JSON.parse(localStorage.getItem('auth_user'));
      this.newWorkspace.user_id = auth_user.id;

      this.isSubmitting = true;
      try {
        await axios.post('/api/workspace/store', this.newWorkspace);
        this.showModal = false;
        await this.getAllworkspace();
      } catch(error) {
        console.error("Error adding workspace:", error);
        // Optionally show a user friendly message here
      } finally {
        this.isSubmitting = false;
      }
    },

    async saveEdit() {
      if (!this.newWorkspace.name) return alert("Workspace name is required");

      this.isSubmitting = true;
      try {
        await axios.post('/api/workspace/update', this.newWorkspace);
        this.showModal = false;
        await this.getAllworkspace();
      } catch(error) {
        console.error("Error updating workspace:", error);
      } finally {
        this.isSubmitting = false;
      }

    },

    async deleteWorkspace(id) {
      if (!confirm("Are you sure you want to delete this workspace?")) return;

      await axios.delete(`/api/workspace/delete/${id}`)
        .then(response => {
            this.getAllworkspace();
        })
        .catch(error => {
            console.error("Error deleting workspace:", error);
        });

    },
    async getAllworkspace(){
        this.loading = true;
        let auth_user = JSON.parse(localStorage.getItem('auth_user'));
       
        await axios.get(`/api/workspace/get/all/${auth_user.id}`)
        .then(response => {
            this.workspaces = response.data.data;
            this.loading = false;
        })
        .catch(error => {
            console.error("Error fetching workspaces:", error);
        });
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
  z-index: 99999999;
  background-color: #f8f8f8;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
