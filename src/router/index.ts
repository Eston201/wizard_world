import { useAuthStore } from "@/store/auth";
import { createRouter, createWebHistory } from "vue-router";
import { ROUTE_NAMES } from "./types";
import { routes } from "./routes";
import { checkAccessPermission } from "./accessControl";
import { useUserStore } from "@/store/user";

const router =  createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from) => {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated;
    // redirect to login
    if (!isAuthenticated && to.meta.requiresAuth) return {name: ROUTE_NAMES.AUTH};
    // no need to show login page once logged in
    if (isAuthenticated && to.name === ROUTE_NAMES.AUTH) return from;

    // Check role based routes
    if (to.meta.requiresRole) {
        const userStore = useUserStore();
        const {hasPermission, redirectPathName} = checkAccessPermission(to, from, userStore.user.role);
        if (!hasPermission) return {name: redirectPathName};
    }
});

export default router;