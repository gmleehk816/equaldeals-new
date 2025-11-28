<template>
    <aside class="w-64 bg-white shadow-md p-6">
        <h1 class="text-2xl font-bold mb-6">Projects</h1>

        <nav class="space-y-2">
            <button 
                @click="activeTab = 'list'"
                :class="navClass('list')"
            >
                📁 All Projects
            </button>

            <button 
                @click="openProjectForm(false)"
                class="block w-full text-left px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
                ➕ Create Project
            </button>

            <button :class="navClass('tasks')">
                📌 Tasks
            </button>

            <button :class="navClass('team')">
                👥 Team Members
            </button>

            <button :class="navClass('settings')">
                ⚙️ Project Settings
            </button>
        </nav>
    </aside>
</template>