import { defineStore } from 'pinia';

const useWorkspaceStore = defineStore('workspace', {
    state: () => ({
        isSaveUpdate: true,
        tasks: [],
        task_form: {
            edit_id: null,
            project_id: null,
            creator_id: null,
            title: '',
            due_date: '',
            description: ''
        }
    }),
    
    getters: {
        getTaskForm() {
            return this.task_form;
        }
    },
    
    actions: {
        initializeTaskForm(projectId) {
            const authUser = JSON.parse(localStorage.getItem('auth_user'));
            this.task_form.project_id = projectId;
            this.task_form.creator_id = authUser ? authUser.id : null;
        },
        
        resetTaskForm() {
            this.task_form = {
                edit_id: null,
                project_id: null,
                creator_id: null,
                title: '',
                due_date: '',
                description: ''
            };
        },
        
        setTaskFormData(taskData) {
            this.task_form.edit_id = taskData.id || this.task_form.edit_id;
            this.task_form.project_id = taskData.project_id || this.task_form.project_id;
            this.task_form.creator_id = taskData.creator_id || this.task_form.creator_id;
            this.task_form.title = taskData.title || '';
            this.task_form.due_date = taskData.due_date || '';
            this.task_form.description = taskData.description || '';
        },
        
        setTasks(tasks) {
            this.tasks = tasks || [];
        }
    },
});
export { useWorkspaceStore };
