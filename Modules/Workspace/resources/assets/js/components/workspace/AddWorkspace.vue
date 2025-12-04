<template>
    <div class="row">
        <div class="col-12  mb-4">
        <h3>My Workspaces</h3>
        <button 
            @click="openAddModal()"
            class="btn btn-primary btn-sm"
        >
            + Add Workspace 
        </button><br>
         <router-link to="/home" class="">Go to Home</router-link>
        </div>
    </div>
    <div 
    v-if="showModal" 
    class="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
        <div class="p-6 rounded-lg w-50 shadow-lg border" :class="theme">
            <h2 class="text-xl font-semibold mb-4 text-lab-pr dark:text-lab-pr-dark">{{ isEditing ? "Edit Workspace" : "Create Workspace" }}</h2>

            <input 
            v-model="newWorkspace.name"
            type="text"
            placeholder="Workspace Name"
            class="w-full border p-3 mb-3 rounded-2xl"
            />

            <select v-model="newWorkspace.visibility_scope" class="w-full border p-3 mb-3 rounded-2xl" :class="theme">
                <option value="" selected>Select Visibility Scope</option>
                <option value="private">Private</option>
                <option value="friends">Friends</option>
                <option value="public">Public</option>
            </select>

            <textarea
            v-model="newWorkspace.description"
            placeholder="Description"
            class="w-full border border-edge-pr p-3 mb-3 rounded-2xl"
            ></textarea>

            <div class="flex justify-end space-x-2 gap-2">
            <button 
                @click="showModal = false"
                class="btn btn-sm btn-secondary px-3 py-2 rounded"
            >
                Cancel
            </button>

            <button
            @click="isEditing ? saveEdit() : addWorkspace()"
            :disabled="isSubmitting"
            :class="[ 'px-3 py-2 rounded', isSubmitting ? 'bg-blue-400 text-white cursor-not-allowed' : 'btn btn-primary' ]"
            >
            <span v-if="isSubmitting" class="d-flex btn btn-primary">
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
</template>
<script>
import axios from 'axios';
import workspaceGlobal from "@workspace/config/global.js";
export default {
    name: "AddWorkspace",
    emits: ['getAllworkspace'],
    components: {
        workspaceGlobal
    },
    data() {
        return {
            showModal: false,
            isEditing: false,
            isSubmitting: false,
            newWorkspace: {
                name: "",
                visibility_scope: "",
                description: "",
            }
        };
    },
    computed: {
        theme() {
            // if(this.$global.theme == 'light') {
            //     return 'theme-light';
            // }
            // if(this.$global.theme == 'dark') {
            //     return 'theme-dark';
            // }
            return "theme-light";
        },
        global(){
            return workspaceGlobal;
        }
    },
    methods: {
        openAddModal() {
                this.isEditing = false;
                this.newWorkspace = { name: "", visibility_scope: "", description: "" };
                this.showModal = true;
        },

        async addWorkspace() {
            if (!this.newWorkspace.name) return alert("Workspace name is required");

            let auth_user = JSON.parse(localStorage.getItem('auth_user'));
            this.newWorkspace.user_id = auth_user.id;

            this.isSubmitting = true;
            try {
                let url = this.global.app_url+'/workspace/store';
                await axios.post(url, this.newWorkspace);
                this.showModal = false;
                await this.$emit('getAllworkspace');
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
                let url = this.global.app_url+'/workspace/update';
                await axios.post(url, this.newWorkspace);
                this.showModal = false;
                await this.$emit('getAllworkspace');
            } catch(error) {
                console.error("Error updating workspace:", error);
            } finally {
                this.isSubmitting = false;
            }

        },
    }
};
</script>
<style scoped>
@import 'bootstrap/dist/css/bootstrap.min.css';
.theme-light {
  background-color: #fff;
  color:  #111111;
}

.theme-dark {
  background-color: #111111;
  color: #fff;
}
</style>