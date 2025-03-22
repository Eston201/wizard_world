import type { RouteRecordRaw } from 'vue-router';
import { ROUTE_NAMES } from './types';

// Views
const Home = () => import('@/views/Home/Home.vue');
const Auth = () => import('@/views/Authentication/Authentication.vue');
const Houses = () => import('@/views/Houses/Houses.vue');
const Spells = () => import('@/views/Spells/Spells.vue');
const Elixirs = () => import('@/views/Elixirs/Elixirs.vue');

export const routes: RouteRecordRaw[] = [
    {
        path: '/auth',
        name: ROUTE_NAMES.AUTH,
        component: Auth,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/', 
        name: ROUTE_NAMES.HOME, 
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/houses',
        name: ROUTE_NAMES.HOUSES,
        component: Houses,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/spells',
        name: ROUTE_NAMES.SPELLS,
        component: Spells,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/elixirs',
        name: ROUTE_NAMES.ELIXIRS,
        component: Elixirs,
        meta: {
            requiresAuth: true
        }
    }
];