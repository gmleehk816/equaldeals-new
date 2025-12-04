import { defineStore } from 'pinia';
import { colibriAPI } from '@/kernel/services/api-client/native/index.js';

const useAuthStore = defineStore('auth_store', {
    state: function() {
		return {
            user: null,
		}
	},
    getters: {
        authCheck: function() {
            return this.user !== null;
        },
        userData: function(state) {
            return this.user;
        }
    },
    actions: {
        setUser: function(userData) {
           this.user = userData;
           // Store user data in localStorage for workspace module access
           if (userData) {
               localStorage.setItem('auth_user', JSON.stringify(userData));
           } else {
               localStorage.removeItem('auth_user');
           }
        },
        setProperty: function(key, value) {
            this.user[key] = value;
            // Update localStorage when user properties change
            if (this.user) {
                localStorage.setItem('auth_user', JSON.stringify(this.user));
            }
        },
        logoutUser: async function() {
            // Clear localStorage on logout
            localStorage.removeItem('auth_user');
            return await colibriAPI().userAuth().sendTo('logout');
        }
    }
});

export { useAuthStore };