import { defineStore } from "pinia";
import { ref } from "vue";
import { ROLE, useUserStore } from "./user";

export const HEADMASTER_AUTH = 'headmaster';
export const EXPLORER_AUTH = 'explorer';

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(true);

    function login(username: string, password: string) {
        const userStore = useUserStore();

        if (username === HEADMASTER_AUTH && password === HEADMASTER_AUTH) {
            userStore.setUser(ROLE.HEADMASTER, HEADMASTER_AUTH);
            isAuthenticated.value = true;
        }
        else if (username === EXPLORER_AUTH && password === EXPLORER_AUTH) {
            userStore.setUser(ROLE.EXPLORER, EXPLORER_AUTH);
            isAuthenticated.value = true;
        }

        return isAuthenticated.value;
    }

    return {
        isAuthenticated,
        login
    }
});