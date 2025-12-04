// Workspace module composable for global config
import workspaceGlobal from './config/global.js';

// Export composable to use in workspace components
export function useWorkspaceGlobal() {
    return workspaceGlobal;
}

export default workspaceGlobal;
