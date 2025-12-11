import { defineStore } from 'pinia';
import axios from 'axios';
import  workspaceGlobal  from '@workspace/config/global.js';

const useWorkspaceStore = defineStore('workspace', {
    state: () => ({
        isSaveUpdate: true,
        task:[],
        task_form: {
            edit_id: null,
            project_id: null,
            group_id: null,
            creator_id: null,
            title: '',
            due_date: '',
            status: '',
            description: ''
        },
    }),
    
    getters: {
        getTaskForm() {
            return this.task_form;
        },
        getProject() {
            return this.project;
        }
    },
    
    actions: {
        initializeTaskForm(projectId, groupId) {
            const authUser = JSON.parse(localStorage.getItem('auth_user'));
            this.task_form.project_id = projectId;
            this.task_form.group_id = groupId;
            this.task_form.creator_id = authUser ? authUser.id : null;
        },
        
        resetTaskForm() {
            this.task_form = {
                edit_id: null,
                project_id: null,
                group_id: null,
                creator_id: null,
                title: '',
                due_date: '',
                status: '',
                description: ''
            };
        },
        
        setTaskFormData(taskData) {
            this.task_form.edit_id = taskData.id || this.task_form.edit_id;
            this.task_form.project_id = taskData.project_id || this.task_form.project_id;
            this.task_form.creator_id = taskData.creator_id || this.task_form.creator_id;
            this.task_form.title = taskData.title || '';
            this.task_form.due_date = taskData.due_date || '';
            this.task_form.status = taskData.status || '';
            this.task_form.description = taskData.description || '';
        },
        
        async getProjectById(project_id) {
            const url = `${workspaceGlobal.app_url}/project/by/${project_id}`;

            try {
                const response = await axios.get(url);

                // Safely parse data whether it's already JSON or a string
                let res = response.data.data;
        
                console.log("Fetched project data:", res);

                // Store using safe key
                localStorage.setItem(
                    `project_${project_id}`,
                    JSON.stringify(res)
                );

            } catch (error) {
                console.error("Error fetching project data:", error);
            }
        },
        async getTaskByStatus(project_id,group_id, status) {
            let url = `${workspaceGlobal.app_url}/task/status`;
            let body = {
                project_id: project_id,
                group_id: group_id,
                status: status
            }
            try {
                const response = await axios.get(url, { params: body });
                return response.data.data || [];
            } catch (error) {
                console.error("Error fetching tasks by status:", error);
                return [];
            }
        }
        
    },
});
export { useWorkspaceStore };
