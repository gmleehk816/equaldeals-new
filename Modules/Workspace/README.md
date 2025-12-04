# Workspace Module - Vue.js SPA

A fully self-contained Vue.js Single Page Application within the Laravel Workspace module.

## 🎯 Features

- ✅ Vue 3 with Composition API
- ✅ Vue Router for client-side routing
- ✅ Pinia for state management
- ✅ Laravel API integration
- ✅ Standalone SPA with its own entry point
- ✅ SCSS styling
- ✅ Authentication middleware

## 📁 Module Structure

```
Modules/Workspace/
├── App/
│   └── Http/
│       └── Controllers/
│           └── WorkspaceController.php    # API & View controller
├── Providers/
│   └── WorkspaceServiceProvider.php       # Service provider
├── routes/
│   ├── web.php                            # Web routes (SPA entry)
│   └── api.php                            # API routes
├── resources/
│   ├── views/
│   │   └── index.blade.php                # SPA HTML entry point
│   └── assets/
│       ├── js/
│       │   ├── app.js                     # Vue app initialization
│       │   ├── WorkspaceApp.vue           # Root component
│       │   ├── router/
│       │   │   └── index.js               # Vue Router config
│       │   ├── stores/
│       │   │   └── workspace.js           # Pinia store
│       │   └── components/
│       │       ├── WorkspacePage.vue      # Home page
│       │       ├── ProjectsPage.vue       # Projects list
│       │       └── ProjectDetailPage.vue  # Project detail
│       └── sass/
│           └── app.scss                   # Module styles
```

## 🚀 Routes

### Web Routes (Laravel)
- `GET /workspace` - Main SPA entry point (auth required)
- `GET /workspace/{any}` - Catch-all for Vue Router (auth required)

### Vue Router Routes (Client-side)
- `/` - Workspace home page
- `/projects` - Projects list page
- `/project/:id` - Project detail page

### API Routes (Laravel)
- `GET /api/v1/workspaces` - Get all workspaces
- `GET /api/v1/workspaces/{id}` - Get workspace by ID
- `POST /api/v1/workspaces` - Create new workspace
- `PUT /api/v1/workspaces/{id}` - Update workspace
- `DELETE /api/v1/workspaces/{id}` - Delete workspace

## 🔧 Components

### WorkspacePage.vue
Home page component with welcome message, user info, and quick links.

### ProjectsPage.vue
Projects list with:
- Grid layout displaying all projects
- Create new project button + modal
- Click to view project details
- Loading and error states
- Integration with Pinia store

### ProjectDetailPage.vue
Project detail view with:
- Project information
- Task checklist with toggle functionality
- Back navigation
- Formatted dates
- Loading and error states

## 💾 State Management (Pinia Store)

The `workspace` store provides:

**State:**
- `projects` - Array of all projects
- `currentProject` - Currently viewed project
- `loading` - Loading state
- `error` - Error messages

**Actions:**
- `fetchProjects()` - Load all projects from API
- `fetchProject(id)` - Load specific project
- `addProject(data)` - Create new project
- `updateProject(id, data)` - Update project
- `deleteProject(id)` - Delete project

**Getters:**
- `getProjectById(id)` - Find project by ID
- `hasProjects` - Check if projects exist

## 🎨 Styling

Module-specific styles are in `resources/assets/sass/app.scss`. Each component has scoped styles.

## 🔐 Authentication

All routes require authentication via Laravel's `auth` and `verified` middleware.

## 📦 Build Process

Assets are built via Vite and configured in the main `vite.config.js`:

```javascript
input: [
    'Modules/Workspace/Resources/assets/js/app.js',
    'Modules/Workspace/Resources/assets/sass/app.scss',
]
```

Build command:
```bash
npm run build:vite
```

## 🌐 Access

Navigate to: `https://equaldeals.local/workspace` (must be authenticated)

## 🔄 Development Workflow

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Make changes** to Vue components in `resources/assets/js/`

3. **Hot reload** automatically updates in browser

4. **Build for production:**
   ```bash
   npm run build:vite
   ```

## 📝 Adding New Routes

1. Add route to `resources/assets/js/router/index.js`:
   ```javascript
   {
       path: '/your-route',
       name: 'workspace_your_route',
       component: () => import('../components/YourComponent.vue'),
       meta: { title: 'Your Title', requiresAuth: true }
   }
   ```

2. Create component in `resources/assets/js/components/`

3. Add navigation link in `WorkspaceApp.vue`

## 📝 Adding New API Endpoints

1. Add route to `routes/api.php`:
   ```php
   Route::get('your-endpoint', [WorkspaceController::class, 'yourMethod'])
       ->name('workspace.api.your_method');
   ```

2. Add method to `App/Http/Controllers/WorkspaceController.php`

3. Add action to Pinia store if needed

4. Use in components via store actions

## 🎯 Best Practices

- Keep components in `resources/assets/js/components/`
- Use Composition API with `<script setup>`
- Store API calls in Pinia store actions
- Use scoped styles in components
- Handle loading and error states
- Include proper navigation guards
- Use semantic naming for routes
- Add meta information for routes

## 🐛 Troubleshooting

**Route 404:**
- Ensure catch-all route in main `routes/web.php` excludes workspace:
  ```php
  ->where('any', '^(?!workspace).*$')
  ```

**Assets not loading:**
- Run `npm run build:vite`
- Clear route cache: `php artisan route:clear`
- Clear config cache: `php artisan config:clear`

**API errors:**
- Check authentication (Sanctum)
- Verify CSRF token in requests
- Check browser console for errors

## 📚 Tech Stack

- Laravel 11.x
- Vue 3 (Composition API)
- Vue Router 4
- Pinia (State Management)
- Vite 5.4.14
- SCSS
- Laravel Sanctum (API Auth)
