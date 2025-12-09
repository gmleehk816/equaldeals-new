<template>
  <div class="w-full h-full bg-gray-50 p-10">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-semibold">Members</h1>
      <p class="text-gray-600">Manage workspace members & invite new teammates.</p>
    </div>

    <!-- Invite Button -->
    <div class="flex justify-end mb-6">
      <button 
        @click="openInvite = true"
        class="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
      >
        Invite Members
      </button>
    </div>

    <!-- Members List -->
    <div class="bg-white shadow-sm border rounded-xl overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="border-b bg-gray-50 text-left">
            <th class="py-3 px-4 text-sm font-medium text-gray-600">Member</th>
            <th class="py-3 px-4 text-sm font-medium text-gray-600">Role</th>
            <th class="py-3 px-4 text-sm font-medium"></th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(m, i) in members" 
            :key="i" 
            class="border-b last:border-none hover:bg-gray-50"
          >
            <td class="py-4 px-4 flex items-center gap-3">
              <div class="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-700">
                {{ m.email.charAt(0).toUpperCase() }}
              </div>
              <div>
                <p class="font-medium">{{ m.email }}</p>
                <p class="text-xs text-gray-500">Pending Invite</p>
              </div>
            </td>

            <td class="py-4 px-4">
              <span class="px-3 py-1 text-sm bg-gray-100 rounded-lg">
                {{ m.role }}
              </span>
            </td>

            <td class="py-4 px-4 text-right">
              <button 
                class="text-red-500 hover:underline" 
                @click="remove(i)"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- INVITE SLIDE-OVER -->
    <transition name="slide">
      <div 
        v-if="openInvite"
        class="fixed inset-0 bg-black/30 flex justify-end z-40"
        @click.self="openInvite = false"
      >
        <div class="w-[400px] bg-white h-full shadow-xl p-6 flex flex-col">
          <h2 class="text-xl font-semibold mb-4">Invite Members</h2>

          <!-- Workspace Invite Link -->
          <div class="mb-6">
            <label class="font-medium">Invite Link</label>
            <div class="flex items-center mt-2 bg-gray-100 rounded-lg p-2">
              <p class="text-sm text-gray-700 flex-1 truncate">
                {{ inviteLink }}
              </p>
              <button 
                @click="copyLink"
                class="text-blue-600 hover:underline"
              >
                Copy
              </button>
            </div>
          </div>

          <!-- Email Entry -->
          <label class="font-medium">Add Email</label>
          <div class="flex mt-2">
            <input 
              v-model="email"
              type="email"
              placeholder="person@example.com"
              class="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <!-- Role Selection -->
          <label class="font-medium mt-4">Role</label>
          <select 
            v-model="role"
            class="w-full px-3 py-2 border rounded-lg mt-2"
          >
            <option disabled value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Member">Member</option>
            <option value="Guest">Guest</option>
          </select>

          <button 
            @click="invite"
            class="mt-6 bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
          >
            Send Invite
          </button>

          <button 
            class="mt-4 text-gray-600 hover:underline"
            @click="openInvite = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const openInvite = ref(false);
const email = ref("");
const role = ref("");
const inviteLink = ref("https://workspace.app/invite/XYZ-123");

const members = ref([]);

const invite = () => {
  if (!email.value || !role.value) return;

  members.value.push({
    email: email.value,
    role: role.value
  });

  email.value = "";
  role.value = "";
};

const remove = (i) => {
  members.value.splice(i, 1);
};

const copyLink = () => {
  navigator.clipboard.writeText(inviteLink.value);
  alert("Invite link copied!");
};
</script>

<style>
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}
.slide-enter-to, .slide-leave-from {
  transform: translateX(0);
}
.slide-enter-active, .slide-leave-active {
  transition: transform 0.25s ease;
}
</style>
