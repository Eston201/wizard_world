import { defineStore } from "pinia";
import { ref } from "vue";
import { ROLE, useUserStore } from "./user";

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
        const userStore = useUserStore();
        userStore.clearUser();
        window.localStorage.clear();
        window.location.reload();
    }

    return {
        isAuthenticated,
        login,
        logout
    }
});