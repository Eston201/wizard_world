import { useAuthStore } from "@/store/auth";
import { 
    createRouter, 
    createWebHistory,
} from "vue-router";

// Views
const Home = () => import('@/views/Home/Home.vue');
const Auth = () => import('@/views/Authentication/Authentication.vue');
const Houses = () => import('@/views/Houses/Houses.vue');

const router =  createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/auth',
            name: 'auth',
            component: Auth,
            meta: {
                requiresAuth: false
            }
        },
        {
            path: '/', 
            name: 'home', 
            component: Home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/houses',
            name: 'houses',
            component: Houses,
            meta: {
                requiresAuth: true
            }
        }
    ]
});

router.beforeEach((to, from) => {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated;
    // redirect to login
    if (!isAuthenticated && to.meta.requiresAuth) return {name: 'auth'};
    // no need to show login page once logged in
    if (isAuthenticated && to.name === "auth") return from;
});

export default router;