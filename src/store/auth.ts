import { ref } from "vue";
import { defineStore } from "pinia";
import { ROLE, useUserStore } from "./user";
import { ROUTE_NAMES } from "@/router/types";
import router from "@/router";

export const HEADMASTER_AUTH = 'headmaster';
export const EXPLORER_AUTH = 'explorer';

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false);

    function login(username: string, password: string) {
        const userStore = useUserStore();

        if (username === HEADMASTER_AUTH && password === HEADMASTER_AUTH) {
            userStore.setUser(ROLE.HEADMASTER, HEADMASTER_AUTH);
            isAuthenticated.value = true;
            window.localStorage.setItem('user', username); // Cheap way to stay logged in 
        }
        else if (username === EXPLORER_AUTH && password === EXPLORER_AUTH) {
            userStore.setUser(ROLE.EXPLORER, EXPLORER_AUTH);
            isAuthenticated.value = true;
            window.localStorage.setItem('user', username); // Cheap way to stay logged in 
        }

        return isAuthenticated.value;
    }

    function logout() {
        isAuthenticated.value = false;
        // Clear user state
        const userStore = useUserStore();
        userStore.clearUser();
        // Clear local storage key
        window.localStorage.clear();
        // Re-route to login
        router.push({name: ROUTE_NAMES.AUTH});
    }

    return {
        isAuthenticated,
        login,
        logout
    }
});