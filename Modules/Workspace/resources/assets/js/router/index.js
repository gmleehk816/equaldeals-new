import { createRouter, createWebHistory } from 'vue-router';
import WorkspacePage from '../views/workspace/WorkspacePage.vue';
import ProjectManagePage from '../views/workspace/project/ProjectManagePage.vue';
import { Layouts } from '@D/core/constants/layouts.js';

export const routes = [
        {
            path: '/workspace',
            component: WorkspacePage,
            meta: {
                    layout: Layouts.MAIN,
                    auth: true,
                },
            name: 'workspace_home',
            children: [
                {
                    path: ':workspace_id',
                    component: function() {
                        return import('../views/workspace/children/ProjectPage.vue');
                    },
                    name: 'project_page',
                }
            ]
        },
        {
            path: '/workspace/project/:project_id',
            component: ProjectManagePage,
            meta: {
                layout: Layouts.MAIN,
                contextNavbar: true,
                sectionName: 'workspace',
                auth: true,
                fluidLayout: true
            },
            name: 'project_manage_page',
            children: [
                {
                    path: 'tasks',
                    component: function() {
                        return import('../views/workspace/project/children/TaskPage.vue');
                    },
                    name: 'project_tasks_page',
                },
                {
                    path: 'checklist',
                    component: function() {
                        return import('../views/workspace/project/children/ChecklistPage.vue');
                    },
                    name: 'project_checklist_page', 
                },
                {
                    path: 'add-task',
                    component: function() {
                        return import('../views/workspace/project/children/AddTaskPage.vue');
                    },
                    name: 'project_add_task_page',  
                }
            ]
                
        },
];

const router = createRouter({
    history: createWebHistory('/workspace'),
    routes,
});

// Navigation guards
router.beforeEach((to, from, next) => {
    // Set page title
    if (to.meta.title) {
        document.title = `${to.meta.title} - Workspace`;
    }
    next();
});

export default router;
