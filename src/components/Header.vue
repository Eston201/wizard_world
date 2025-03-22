<template>
    <div class="header__wrapper">
        <header>
            <div class="logo_wrapper">
                <router-link class="home-link" to="/">Wizward World</router-link>
            </div>

            <nav
                v-if="authStore.isAuthenticated && route.name !== ROUTE_NAMES.HOME"
                class="desktop-nav"
            >
                <router-link 
                    class="nav-link"
                    v-for="{label, routeName} of routes"
                    :key="routeName"
                    :to="{name: routeName}"
                >
                    {{ label }}
                </router-link>
            </nav>
            
            <div class="spacer"/>
        </header>
    </div>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from '@/router/types';
import { useAuthStore } from '@/store/auth';
import { useRoute } from 'vue-router';

const route = useRoute();
const authStore = useAuthStore();

const routes = [
    {
        label: 'Houses',
        routeName: ROUTE_NAMES.HOUSES,
    },
    {
        label: 'Spells',
        routeName: ROUTE_NAMES.SPELLS,
    },
    {
        label: 'Elixirs',
        routeName: ROUTE_NAMES.ELIXIRS,
    },
];
</script>

<style lang="scss" scoped>
.header__wrapper {
    position: sticky;
    top: 0;
    z-index: 1;

    min-height: 65px;
    margin-top: 1.5rem;
    padding-inline: var(--viewport-padding);
}

header {
    display: flex;
    align-items: center;
    gap: 22px;
}

// Logo
.logo_wrapper {
    flex: 1;
}
.home-link {
    font-family: var(--harry-p);
    font-size: 2.25rem;
    color: hsl(var(--color-primary))
}

// Desktop Nav
.desktop-nav {
    list-style: none;
    display: flex;
    gap: 12px;
}
.nav-link {
    font-size: 1.125rem;
}
.spacer {
    flex: 1;
}

a {
    color: inherit;
    text-decoration: none;
}
</style>