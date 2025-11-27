import { defineStore } from 'pinia';
import { colibriAPI } from '@/kernel/services/api-client/native/index.js';

const STORAGE_KEY = 'auth_user';
const TOKEN_STORAGE_KEY = 'auth_token';

const useAuthStore = defineStore('auth_store', {
    state: function() {
		return {
            user: null,
            token: null,
		}
	},
    getters: {
        authCheck: function() {
            return this.user !== null;
        },
        userData: function(state) {
            return this.user;
        },
        authToken: function(state) {
            return this.token;
        },
        hasToken: function() {
            return this.token !== null;
        }
    },
    actions: {
        setUser: function(userData) {
           this.user = userData;
           this.saveToLocalStorage();
        },
        setToken: function(token) {
            this.token = token;
            this.saveTokenToLocalStorage();
            // Set token in axios headers
            if(window.axios) {
                window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        },
        setProperty: function(key, value) {
            this.user[key] = value;
            this.saveToLocalStorage();
        },
        loadFromLocalStorage: function() {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);
                if(stored) {
                    this.user = JSON.parse(stored);
                }
            } catch(error) {
                console.error('Failed to load auth from localStorage:', error);
                this.clearLocalStorage();
            }
        },
        loadTokenFromLocalStorage: function() {
            try {
                const token = localStorage.getItem(TOKEN_STORAGE_KEY);
                if(token) {
                    this.token = token;
                    // Set token in axios headers
                    if(window.axios) {
                        window.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    }
                }
            } catch(error) {
                console.error('Failed to load token from localStorage:', error);
                this.clearTokenFromLocalStorage();
            }
        },
        saveToLocalStorage: function() {
            try {
                if(this.user) {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.user));
                }
            } catch(error) {
                console.error('Failed to save auth to localStorage:', error);
            }
        },
        saveTokenToLocalStorage: function() {
            try {
                if(this.token) {
                    localStorage.setItem(TOKEN_STORAGE_KEY, this.token);
                }
            } catch(error) {
                console.error('Failed to save token to localStorage:', error);
            }
        },
        clearLocalStorage: function() {
            localStorage.removeItem(STORAGE_KEY);
            this.user = null;
            this.clearTokenFromLocalStorage();
        },
        clearTokenFromLocalStorage: function() {
            localStorage.removeItem(TOKEN_STORAGE_KEY);
            this.token = null;
            // Remove token from axios headers
            if(window.axios) {
                delete window.axios.defaults.headers.common['Authorization'];
            }
        },
        logoutUser: async function() {
            try {
                await colibriAPI().userAuth().sendTo('logout');
            } catch(error) {
                console.error('Logout error:', error);
            }
            this.clearLocalStorage();
        }
    }
});

export { useAuthStore };