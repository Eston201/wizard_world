<template>
    <div class="header__wrapper">
        <header>
            <div class="logo_wrapper">
                <router-link class="home-link" to="/">Wizward World</router-link>
            </div>

            <Navigation
                v-if="navVisible"
                class="desktop-nav"
            >
                <template #default="{route}">
                    <router-link 
                        class="nav-link"
                        :to="{name: route.routeName}"
                    >
                        {{ route.label }}
                    </router-link>
                </template>
            </Navigation>
            
            <div class="spacer"/>

            <Button
                v-if="authStore.isAuthenticated"
                class="logout-btn" 
                @click="authStore.logout" 
                label="Logout"
            />

            <div
                class="mobile-menu__wrapper" 
                @click="isMobileVisible = !isMobileVisible"
            >
                <MobileHamburger 
                    :isOpened="isMobileVisible"
                />
            </div>
        </header>
    </div>
    <MobileNavigation 
        :is-visible="isMobileVisible"
        @update:visible="(isVisible: boolean) => isMobileVisible = isVisible"
        @close-mobile-nav="isMobileVisible = false"
    />
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from '@/router/types';
import { useAuthStore } from '@/store/auth';
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
import { Button } from 'primevue';
import MobileHamburger from './MobileHamburger.vue';
import MobileNavigation from './MobileNavigation.vue';
import Navigation from './Navigation.vue';

const route = useRoute();
const authStore = useAuthStore();

const navVisible = computed(() => {
    if (!authStore.isAuthenticated) return false;
    else if (route.name === ROUTE_NAMES.AUTH || route.name === ROUTE_NAMES.HOME) return false;
    return true;
});

// Mobile
const isMobileVisible = ref(false);
</script>

<style lang="scss" scoped>
.header__wrapper {
    min-height: 65px;

    position: sticky;
    top: 0;
    z-index: 1;
    
    padding-top: 6px;
    padding-inline: var(--viewport-padding);
    --top-buffer: 1.5rem;
    margin-top: var(--top-buffer);
    
    --header-overlay-bg-color: hsl(0, 0%, 5%, 0.75);

    &::before {
        height: calc(100% + var(--top-buffer)); // increase by buffer

        content: "";
        position: absolute;
        inset: 0;
        top: calc(var(--top-buffer) * -1); // Shift back up by buffer
        z-index: -1;

        background-color: var(--header-overlay-bg-color);
        border-bottom: 1px solid hsl(var(--color-primary), 0.2);
        backdrop-filter: blur(3px);
    }

    @media (prefers-color-scheme: light) {
        --header-overlay-bg-color: hsla(0, 0%, 100%, 0.95);
    }
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
    
    @include mobileAndBelow() {
        font-size: 1.75rem;
    }
}

// Desktop Nav
.desktop-nav {
    align-self: stretch;
    list-style: none;

    display: flex;
    align-items: center;
    gap: 3rem;

    @include tabletAndBelow() {
        display: none;
    }

    // syle active nav links
    .router-link-active {
        color: hsl(var(--color-primary));
        
        filter: drop-shadow(0 0 15px hsl(var(--color-primary), 0.5)) 
                drop-shadow(0 0 25px hsl(var(--color-primary)));
        transition: all 0.3s ease;
    }
}
.nav-link {
    height: 100%;

    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: 1px;
    color: hsl(var(--text-color), 0.6);

    display: flex;
    align-items: center;

    &:not(.router-link-active):hover {
        color: hsl(var(--text-color));
        --filter-color: hsl(var(--text-color), 0.3);
        filter: drop-shadow(0 0 10px var(--filter-color)) 
                drop-shadow(0 0 20px var(--filter-color));
    }
}

.spacer {
    flex: 1;

    @include tabletAndBelow() {
        display: none;
    }
}

.logout-btn {
    @include mobileAndBelow() {
        display: none;
    }
}

.mobile-menu__wrapper {
    display: none;

    @include tabletAndBelow() {
        display: revert;
    }
}

/* Reset router link anchors */
a {
    color: inherit;
    text-decoration: none;
}
</style>