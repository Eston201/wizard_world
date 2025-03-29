import type { RouteRecordRaw } from 'vue-router';
import { ROUTE_NAMES } from './types';

// Views
const Home = () => import('@/views/Home/Home.vue');
const Auth = () => import('@/views/Authentication/Authentication.vue');
const Houses = () => import('@/views/Houses/Houses.vue');
const HouseDetail = () => import('@/views/Houses/HouseDetail.vue');
const Spells = () => import('@/views/Spells/Spells.vue');
const Elixirs = () => import('@/views/Elixirs/Elixirs.vue');
const ElixirDifficulty = () => import('@/views/Elixirs/ElixirDifficulty.vue');
const Scoreboard = () => import('@/views/Scoreboard/Scoreboard.vue');

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
        },
        children: [
            {
                path: '/houses/:id',
                name: ROUTE_NAMES.HOUSE_DETAIL,
                component: HouseDetail,
                meta: {
                    requiresAuth: true 
                }
            }
        ]
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
        },
        children: [
            {
                path: '/elixirs/:difficulty',
                name: ROUTE_NAMES.ELIXIR_DIFFICULTY,
                component: ElixirDifficulty,
                meta: {
                    requiresRole: true
                }
            }
        ]
    },
    {
        path: '/scoreboard',
        name: ROUTE_NAMES.SCOREBOARD,
        component: Scoreboard,
        meta: {
            requiresAuth: true
        }
    }
];