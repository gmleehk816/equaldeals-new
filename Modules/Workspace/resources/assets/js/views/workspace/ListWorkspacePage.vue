<template>
    <div class="grid grid-cols-1 mt-5">
       <AddWorkspace ref="childRef" @getAllworkspace="getAllworkspace"></AddWorkspace>
    </div>
    <div class="grid grid-cols-1 mt-3">
        <div class="p-3" v-if="loading">
            <SkeletonLoader
            width="100%"
            height="15"
            margin="5"
            v-for="i in 9"
            :key="i"
            />
        </div>
        <div class="overflow-x-auto" v-else>
            <table class="min-w-full border border-gray-200 rounded-lg shadow-sm">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Visibility</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Description</th>
                        <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">Action</th>
                    </tr>
                </thead>

                <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(value, index) in workspaces" :key="index" class="hover:bg-gray-50">

                        <td class="px-4 py-2 text-sm text-gray-800">{{ value.name }}</td>
                       
                        <td class="px-4 py-2 text-sm text-gray-800">{{ value.visibility_scope }}</td>
                        <td class="px-4 py-2 text-sm text-gray-600">{{ value.description }}</td>
                        <td class="px-4 py-2 flex gap-2">

                            <router-link :to="{ name: 'workspace_detail_page', params: { workspace_id: value.id } }" class="cursor-pointer px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                                Open
                            </router-link>
                            <button @click="openEditModal(value)" class="cursor-pointer px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                                Edit
                            </button>
                            <button class="px-3 py-1 cursor-pointer text-sm bg-red-600 text-white rounded hover:bg-red-700"
                            @click="deleteWorkspace(value.id)"
                            >
                                Delete
                            </button>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import workspaceGlobal from "@workspace/config/global.js";
import SkeletonLoader from "@workspace/components/SkeletonLoader.vue";
import { useWorkspaceStore } from "@workspace/stores/workspace.js";
import SpinnerLoad from "@workspace/components/skeleton/SpinnerLoad.vue";
import AddWorkspace from "@workspace/components/workspace/AddWorkspace.vue";

export default {
    components: {
        workspaceGlobal,
        SkeletonLoader,
        SpinnerLoad,
        AddWorkspace
    },
  data() {
    return {
        workspaces: [],
        loading: false,
    };
  },
  computed: {
    project_id() {
      return this.$route.params.project_id;
    },
    global(){
        return workspaceGlobal;
    },
    store(){
      const store = useWorkspaceStore();
      return store;
    }
  },
  methods: {
     async getAllworkspace() {
      this.loading = true;

      const userId = JSON.parse(localStorage.getItem('auth_user')).id;
      
      // API route: /api/workspace/get/all/{user_id}
      const url = `${this.global.app_url}/workspace/get/all/${userId}`;

      try {
        const response = await axios.get(url);
        this.workspaces = response?.data?.data || [];
      } catch (error) {
        console.error('Error fetching workspaces:', error);
      } finally {
        this.loading = false;
      }
    },
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

      // API route: /api/workspace/delete/{id}
      const url = `${this.global.app_url}/workspace/delete/${id}`;

      try {
        await axios.delete(url);
        this.getAllworkspace();
      } catch (error) {
        console.error("Error deleting workspace:", error);
      }
    },
  },
    mounted() {
        this.getAllworkspace();
    }
};
</script>
<style scoped>
</style>