// Quick Reference: Workspace Module Vue.js Components

// ============================================
// PINIA STORE USAGE IN COMPONENTS
// ============================================

import { useWorkspaceStore } from '../stores/workspace.js';

// In setup function
const workspaceStore = useWorkspaceStore();

// Access state
workspaceStore.projects
workspaceStore.currentProject
workspaceStore.loading
workspaceStore.error

// Call actions
await workspaceStore.fetchProjects();
await workspaceStore.fetchProject(id);
await workspaceStore.addProject({ name: 'Project Name', description: 'Description' });
await workspaceStore.updateProject(id, { name: 'Updated Name' });
await workspaceStore.deleteProject(id);

// Use getters
workspaceStore.hasProjects
workspaceStore.getProjectById(id)


// ============================================
// ROUTER USAGE
// ============================================

import { useRouter, useRoute } from 'vue-router';

// In setup function
const router = useRouter();
const route = useRoute();

// Navigate programmatically
router.push({ name: 'workspace_projects' });
router.push({ name: 'workspace_project_detail', params: { id: 1 } });
router.back();

// Get current route info
route.params.id
route.path
route.name

// In template
<router-link to="/">Home</router-link>
<router-link :to="{ name: 'workspace_project_detail', params: { id: 1 } }">Project</router-link>


// ============================================
// API FETCH EXAMPLE
// ============================================

// GET request
const response = await fetch('/api/v1/workspaces', {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': window.Laravel.csrfToken,
    },
    credentials: 'same-origin',
});
const result = await response.json();

// POST request
const response = await fetch('/api/v1/workspaces', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': window.Laravel.csrfToken,
    },
    credentials: 'same-origin',
    body: JSON.stringify({ name: 'Project Name', description: 'Description' }),
});

// PUT request
const response = await fetch(`/api/v1/workspaces/${id}`, {
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': window.Laravel.csrfToken,
    },
    credentials: 'same-origin',
    body: JSON.stringify({ name: 'Updated Name' }),
});

// DELETE request
const response = await fetch(`/api/v1/workspaces/${id}`, {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': window.Laravel.csrfToken,
    },
    credentials: 'same-origin',
});


// ============================================
// COMPONENT TEMPLATE EXAMPLE
// ============================================

<template>
    <div class="my-component">
        <h1>{{ title }}</h1>
        
        <!-- Conditional rendering -->
        <div v-if="loading">Loading...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else>
            <!-- List rendering -->
            <div v-for="item in items" :key="item.id">
                {{ item.name }}
            </div>
        </div>
        
        <!-- Event handling -->
        <button @click="handleClick">Click Me</button>
        
        <!-- Form input -->
        <input v-model="formData.name" type="text" />
        
        <!-- Router link -->
        <router-link to="/projects">Go to Projects</router-link>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Reactive state
const title = ref('My Component');
const loading = ref(false);
const error = ref(null);
const items = ref([]);
const formData = ref({ name: '' });

// Computed property
const itemCount = computed(() => items.value.length);

// Methods
const handleClick = () => {
    console.log('Button clicked');
};

const fetchData = async () => {
    loading.value = true;
    try {
        const response = await fetch('/api/v1/workspaces');
        items.value = await response.json();
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

// Lifecycle hook
onMounted(() => {
    fetchData();
});
</script>

<style scoped>
.my-component {
    padding: 2rem;
}
</style>


// ============================================
// COMMON PATTERNS
// ============================================

// 1. Loading state pattern
const loading = ref(false);
const error = ref(null);

const loadData = async () => {
    loading.value = true;
    error.value = null;
    try {
        // fetch data
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

// 2. Form submission pattern
const formData = ref({ name: '', description: '' });
const submitForm = async () => {
    try {
        await workspaceStore.addProject(formData.value);
        formData.value = { name: '', description: '' }; // Reset form
        // Show success message or redirect
    } catch (error) {
        alert('Error: ' + error.message);
    }
};

// 3. Modal pattern
const showModal = ref(false);
const openModal = () => { showModal.value = true; };
const closeModal = () => { showModal.value = false; };

// 4. Navigation pattern
const router = useRouter();
const goToDetail = (id) => {
    router.push({ name: 'workspace_project_detail', params: { id } });
};

// 5. Access Laravel data
const user = computed(() => window.Laravel?.user || null);
const csrfToken = window.Laravel.csrfToken;
const apiUrl = window.Laravel.apiUrl;


// ============================================
// ARTISAN COMMANDS
// ============================================

// Clear caches
php artisan route:clear
php artisan config:clear
php artisan cache:clear
php artisan view:clear

// List routes
php artisan route:list
php artisan route:list --name=workspace

// Run development server
npm run dev

// Build for production
npm run build:vite
