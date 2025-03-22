import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserStore } from "./user";

const HEADMASTER_AUTH = 'headmaster';
const EXPLORER_AUTH = 'explorer';

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(true);

    function login(username: string, password: string) {
        const userStore = useUserStore();

        if (username === HEADMASTER_AUTH && password === HEADMASTER_AUTH) {
            userStore.setUserCreds(HEADMASTER_AUTH, HEADMASTER_AUTH);
            isAuthenticated.value = true;
        }
        else if (username === EXPLORER_AUTH && password === EXPLORER_AUTH) {
            isAuthenticated.value = true;
        }

        return isAuthenticated.value;
    }

    return {
        isAuthenticated,
        login
    }
});