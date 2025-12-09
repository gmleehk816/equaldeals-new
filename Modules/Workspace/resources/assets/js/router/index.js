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
            redirect: { name: 'list_workspace_page' },
            children: [
                {
                    path: ':workspace_id',
                    component: function() {
                        return import('../views/workspace/WorkspaceDetailPage.vue');
                    },
                    name: 'workspace_detail_page',
                    redirect: { name: 'workspace_projects_page' },
                    children: [
                        {
                            path: 'projects',
                            component: function() {
                                return import('../views/workspace/project/ProjectPage.vue');
                            },
                            name: 'workspace_projects_page',
                        },
                        {
                            path: 'member',
                            component: function() {
                                return import('../views/workspace/member/MemberPage.vue');
                            },
                            name: 'workspace_member_page',
                        },
                    ]
                },
                {
                    path: 'all',
                    component: function() {
                        return import('../views/workspace/ListWorkspacePage.vue');
                    },
                    name: 'list_workspace_page',
                },
                
            ]
        },
        {
            path: '/project/:project_id',
            component: ProjectManagePage,
            meta: {
                layout: Layouts.MAIN,
                contextNavbar: true,
                sectionName: 'workspace',
                auth: true,
                fluidLayout: true
            },
            name: 'project_manage_page',
            redirect: { name: 'project_tasks_page' },   
            children: [
                {
                    path: 'tasks',
                    component: function() {
                        return import('../views/workspace/project/children/TaskPage.vue');
                    },
                    name: 'project_tasks_page',
                },
                {
                    path: 'boards',
                    component: function() {
                        return import('../views/workspace/project/children/BoardPage.vue');
                    },
                    name: 'project_boards_page', 
                },
                {
                    path: 'add-task',
                    component: function() {
                        return import('../views/workspace/project/children/AddTaskPage.vue');
                    },
                    name: 'project_add_task_page',  
                },
                {
                    path: 'backlog',
                    component: function() {
                        return import('../views/workspace/backlog/BacklogPage.vue');
                    },
                    name: 'project_backlog_page',
                }
                
            ]
                
        },
];

const router = createRouter({
    history: createWebHistory('/'),
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
