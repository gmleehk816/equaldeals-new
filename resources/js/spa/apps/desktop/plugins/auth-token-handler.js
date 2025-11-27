/**
 * Auth Token Handler
 * Handles retrieving and storing auth tokens from sanctum endpoint
 */

import { useAuthStore } from '@D/store/auth/auth.store.js';

export const setupAuthTokenHandler = async () => {
    const authStore = useAuthStore();
    
    // Check if we need to get a fresh token
    if(!authStore.hasToken && authStore.userData) {
        try {
            // Get token from sanctum/token endpoint
            const response = await fetch('/api/sanctum/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'include',
                body: JSON.stringify({
                    device_name: 'web-browser'
                })
            });
            
            if(response.ok) {
                const token = await response.text();
                if(token) {
                    authStore.setToken(token);
                    console.log('Auth token obtained and stored in localStorage');
                }
            }
        } catch(error) {
            console.error('Failed to obtain auth token:', error);
        }
    }
};

// Export a function to manually store a token
export const storeAuthToken = (token) => {
    const authStore = useAuthStore();
    authStore.setToken(token);
};

// Export a function to get the stored token
export const getAuthToken = () => {
    const authStore = useAuthStore();
    return authStore.authToken;
};
