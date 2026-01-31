import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Send cookies with requests (needed for session on cross-origin dev server)
window.axios.defaults.withCredentials = true;

// Attach CSRF token from meta tag to all axios requests (helps prevent 419 CSRF errors)
const token = typeof document !== 'undefined' ? document.querySelector('meta[name="csrf-token"]') : null;
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.getAttribute('content');
}

