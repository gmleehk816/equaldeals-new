import { defineStore } from 'pinia';

export const useWorkspaceStore = defineStore('workspace', {
    state: () => ({
        projects: [],
        currentProject: null,
        loading: false,
        error: null,
    }),
    
    getters: {
        getProjectById: (state) => (id) => {
            return state.projects.find(project => project.id == id);
        },
        hasProjects: (state) => state.projects.length > 0,
    },
    
    actions: {
        async fetchProjects() {
            this.loading = true;
            this.error = null;
            
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                
                this.projects = [
                    { 
                        id: 1, 
                        name: 'Project Alpha', 
                        description: 'First project workspace',
                        status: 'active',
                        created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
                        updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                    },
                    { 
                        id: 2, 
                        name: 'Project Beta', 
                        description: 'Second project workspace',
                        status: 'active',
                        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                        updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                    },
                    { 
                        id: 3, 
                        name: 'Project Gamma', 
                        description: 'Third project workspace',
                        status: 'completed',
                        created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                        updated_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
                    },
                ];
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        
        async fetchProject(id) {
            this.loading = true;
            this.error = null;
            
            try {
                await new Promise(resolve => setTimeout(resolve, 300));
                
                this.currentProject = {
                    id: id,
                    name: `Project ${id}`,
                    description: 'This is a detailed view of the project workspace. All data is managed by Vue.js.',
                    status: 'active',
                    tasks: [
                        { id: 1, title: 'Setup project structure', completed: true },
                        { id: 2, title: 'Design database schema', completed: true },
                        { id: 3, title: 'Implement Vue components', completed: false },
                        { id: 4, title: 'Create frontend features', completed: false },
                        { id: 5, title: 'Write tests', completed: false },
                    ],
                    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
                    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                };
            } catch (error) {
                this.error = error.message;
            } finally {
                this.loading = false;
            }
        },
        
        async addProject(projectData) {
            this.loading = true;
            this.error = null;
            
            try {
                await new Promise(resolve => setTimeout(resolve, 300));
                
                const newProject = {
                    id: this.projects.length + 1,
                    name: projectData.name,
                    description: projectData.description || '',
                    status: 'active',
                    created_at: new Date(),
                    updated_at: new Date(),
                };
                
                this.projects.push(newProject);
                return newProject;
            } catch (error) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },
        
        async updateProject(id, projectData) {
            this.loading = true;
            this.error = null;
            
            try {
                await new Promise(resolve => setTimeout(resolve, 300));
                
                const index = this.projects.findIndex(p => p.id == id);
                if (index !== -1) {
                    this.projects[index] = {
                        ...this.projects[index],
                        ...projectData,
                        updated_at: new Date(),
                    };
                    return this.projects[index];
                }
            } catch (error) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },
        
        async deleteProject(id) {
            this.loading = true;
            this.error = null;
            
            try {
                await new Promise(resolve => setTimeout(resolve, 300));
                this.projects = this.projects.filter(p => p.id != id);
            } catch (error) {
                this.error = error.message;
                throw error;
            } finally {
                this.loading = false;
            }
        },
    },
});
