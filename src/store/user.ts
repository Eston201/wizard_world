import { defineStore } from "pinia";
import { reactive } from "vue";

interface User {
    role: string;
    username: string;
}

export const useUserStore = defineStore('user', () => {
    const user = reactive<User>({
        role: '',
        username: '',
    });

    function setUserCreds(role: string, username: string) {
        user.role = role;
        user.username = username;
    }

    return {
        user,
        setUserCreds
    }
});