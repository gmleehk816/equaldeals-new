import { createRouter, createWebHistory } from 'vue-router';
import WorkspacePage from '../views/workspace/WorkspacePage.vue';
import ProjectManagePage from '../views/workspace/project/ProjectManagePage.vue';
import { Layouts } from '@D/core/constants/layouts.js';

export const routes = [
        {
            path: '/workspace',
            component: WorkspacePage,
            name: 'workspace_home',
            meta: {
                layout: Layouts.MAIN,
                auth: true,
            },
            redirect: { name: 'list_workspace_page' },
            children: [
                {
                    path: 'all',
                    component: () => import('../views/workspace/ListWorkspacePage.vue'),
                    name: 'list_workspace_page',
                },
                {
                    path: ':workspace_id',
                    component: () => import('../views/workspace/WorkspaceDetailPage.vue'),
                    name: 'workspace_detail_page',
                    redirect: { name: 'workspace_projects_page' },
                    children: [

                        {
                            path: 'projects',
                            component: () => import('../views/workspace/project/ProjectPage.vue'),
                            name: 'workspace_projects_page',
                        },

                    ]
                }
            ]
        },
          {
                path: '/project/:project_id',
                component: ProjectManagePage,
                name: 'project_manage_page',
                meta: {
                    layout: Layouts.MAIN,
                    contextNavbar: true,
                    sectionName: 'workspace',
                    auth: true,
                    fluidLayout: true
                },
                //redirect: { name: 'project_tasks_page' },
                children: [
                    {
                        path: 'group/:group_id',
                        component: () => import('../views/workspace/project/GroupManageDetaiPage.vue'),
                        name: 'project_group',
                        redirect: { name: 'project_tasks_page' },
                        children: [
                            {
                                path: 'tasks',
                                component: () => import('../views/workspace/project/children/TaskPage.vue'),
                                name: 'project_tasks_page',
                            },
                            {
                                path: 'boards',
                                component: () => import('../views/workspace/project/children/BoardPage.vue'),
                                name: 'project_boards_page',
                            },
                            {
                                path: 'add-task',
                                component: () => import('../views/workspace/project/children/AddTaskPage.vue'),
                                name: 'project_add_task_page',
                            },
                            {
                                path: 'backlog',
                                component: () => import('../views/workspace/backlog/BacklogPage.vue'),
                                name: 'project_backlog_page',
                            },
                        ]
                    },
                    {
                        path: 'member',
                        component: () => import('../views/workspace/member/MemberPage.vue'),
                        name: 'project_member_page',
                    }
                    
                ]
            }
        
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
