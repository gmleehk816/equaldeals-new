const workspaceGlobal = {
    app_url:'https://equaldeals.com/api',
    csrfToken: window.BackendEmbeds?.csrfToken || '',
    //locale: window.BackendEmbeds?.locale || 'en',
    //theme: window.BackendEmbeds?.theme || 'light',
    // Workspace-specific configs
    //workspaceApiPrefix: '/workspace',
}

export default workspaceGlobal;