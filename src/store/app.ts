import { defineStore } from "pinia";
import { ref } from "vue";

interface User {
    role: string;
    username: string;
    isAutenticated: boolean;
}

export const useAppStore = defineStore('app', () => {
    const user = ref<User>({
        role: '',
        username: '',
        isAutenticated: false,
    });

    return {
        user
    }
});