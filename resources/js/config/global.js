export default {
    auth_user: localStorage.getItem('auth_user') ? JSON.parse(localStorage.getItem('auth_user')) : null,
    app_url: 'https://equaldeals.local/api',
    theme: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light',
}
