import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const ROLE = {
    HEADMASTER: 'headmaster',
    EXPLORER: 'explorer'
} as const;

export type TRole = typeof ROLE[keyof typeof ROLE];

interface User {
    role: TRole | undefined;
    username: string;
};

export const useUserStore = defineStore('user', () => {
    const user = reactive<User>({
        role: undefined,
        username: '',
    });

    function setUser(role: TRole, username: string) {
        user.role = role;
        user.username = username;
    }

    function clearUser() {
        user.role = undefined;
        user.username = '';
    }

    const isHeadMaster = computed(() => {
        return user.role === ROLE.HEADMASTER;
    });

    return {
        user,
        setUser,
        clearUser,
        isHeadMaster,
    }
});