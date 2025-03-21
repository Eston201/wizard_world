import { 
    createRouter, 
    createWebHistory,
} from "vue-router";

// Views
const Home = () => import('@/views/Home/Home.vue');

const router =  createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', name: 'home', component: Home}
    ]
});

export default router;