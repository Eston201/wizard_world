<template>
    <div class="header__wrapper">
        <header>
            <router-link class="home-link" to="/">Wizward World</router-link>

            <nav v-if="authStore.isAuthenticated && route.path !== '/'">
                <router-link to="/houses">houses</router-link>
            </nav>
        </header>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useRoute } from 'vue-router';

const route = useRoute();
const authStore = useAuthStore();
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

.home-link {
    font-family: var(--harry-p);
    font-size: 2.25rem;
    color: hsl(var(--color-primary))
}

a {
    color: inherit;
    text-decoration: none;
}
</style>