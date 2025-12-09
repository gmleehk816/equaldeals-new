<template>
    <div class="grid grid-cols-2 mt-5 p-2">
      <div>
        <h3 class="text-xl font-semibold mb-3">All Workspaces</h3>
      </div>
      <div class="">
          <button
            @click="openAddModal"
            class="rounded px-3 py-2 float-end text-white bg-blue-600 cursor-pointer"
          >
            + Add Workspace
          </button>
      </div>
    </div>

  <!-- Modal -->
  <div
    v-if="showModal"
    class="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
  >
    <div
      class="w-full max-w-lg p-6 rounded-xl shadow-lg border bg-white dark:bg-gray-900 transition"
    >
      <h2 class="text-xl font-semibold mb-4">
        {{ isEditing ? "Edit Workspace" : "Create Workspace" }}
      </h2>

      <!-- Workspace Name -->
      <input
        v-model="newWorkspace.name"
        type="text"
        placeholder="Workspace Name"
        class="w-full border border-gray-300 dark:border-gray-700 px-4 py-3 mb-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
      />

      <!-- Visibility -->
      <select
        v-model="newWorkspace.visibility_scope"
        class="w-full border border-gray-300 dark:border-gray-700 px-4 py-3 mb-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
      >
        <option value="" selected>Select Visibility Scope</option>
        <option value="private">Private</option>
        <option value="friends">Friends</option>
        <option value="public">Public</option>
      </select>

      <!-- Description -->
      <textarea
        v-model="newWorkspace.description"
        placeholder="Description"
        class="w-full border border-gray-300 dark:border-gray-700 px-4 py-3 mb-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
      ></textarea>

      <!-- Buttons -->
      <div class="flex justify-end gap-3 mt-4">

        <!-- Cancel -->
        <button
          @click="showModal = false"
          class="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition"
        >
          Cancel
        </button>

        <!-- Save / Update -->
        <button
          @click="isEditing ? saveEdit() : addWorkspace()"
          :disabled="isSubmitting"
          class="px-4 py-2 rounded-lg text-white transition
                bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          <span v-if="isSubmitting" class="flex items-center">
            <svg
              class="animate-spin h-4 w-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="white"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="white"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>

            {{ isEditing ? "Updating..." : "Saving..." }}
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
import axios from "axios";
import workspaceGlobal from "@workspace/config/global.js";

export default {
  name: "AddWorkspace",
  emits: ["getAllworkspace"],
  data() {
    return {
      showModal: false,
      isEditing: false,
      isSubmitting: false,
      newWorkspace: {
        name: "",
        visibility_scope: "",
        description: "",
      },
    };
  },

  computed: {
    global() {
      return workspaceGlobal;
    },
  },

  methods: {
    openAddModal() {
      this.isEditing = false;
      this.newWorkspace = { name: "", visibility_scope: "", description: "" };
      this.showModal = true;
    },

    async addWorkspace() {
      if (!this.newWorkspace.name) return alert("Workspace name is required");

      let auth_user = JSON.parse(localStorage.getItem("auth_user"));
      this.newWorkspace.user_id = auth_user.id;

      this.isSubmitting = true;

      try {
        let url = this.global.app_url + "/workspace/store";
        await axios.post(url, this.newWorkspace);
        this.showModal = false;
        await this.$emit("getAllworkspace");
      } catch (error) {
        console.error("Error adding workspace:", error);
      } finally {
        this.isSubmitting = false;
      }
    },

    async saveEdit() {
      if (!this.newWorkspace.name) return alert("Workspace name is required");

      this.isSubmitting = true;

      try {
        let url = this.global.app_url + "/workspace/update";
        await axios.post(url, this.newWorkspace);
        this.showModal = false;
        await this.$emit("getAllworkspace");
      } catch (error) {
        console.error("Error updating workspace:", error);
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped>
.theme-light {
  background-color: #ffffff;
  color: #111111;
}

.theme-dark {
  background-color: #111111;
  color: #ffffff;
}
</style>
