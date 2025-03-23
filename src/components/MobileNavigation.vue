<template>
   <Drawer
        :visible="isVisible" 
        position="right"
        :block-scroll="true"
        :show-close-icon="false"
    >
        <template #container="{closeCallback}">
            <div class="mb-nav__wrapper">
                <h2><VisuallyHidden>Menu</VisuallyHidden></h2>

                <div class="mb-nav-close-btn" @click="closeCallback">
                    <MobileHamburger :is-opened="isVisible"/>
                </div>

                <Navigation class="mobile-nav">
                    <template #default="{route}">
                        <router-link 
                            class="nav-link"
                            :to="{name: route.routeName}"
                            @click="() => emit('closeMobileNav')"
                        >
                            {{ route.label }}
                        </router-link>
                    </template>
                </Navigation>
            </div>
        </template>
    </Drawer>
</template>

<script setup lang="ts">
import { Drawer } from 'primevue';
import VisuallyHidden from './VisuallyHidden.vue';
import MobileHamburger from './MobileHamburger.vue';
import Navigation from './Navigation.vue';

const emit = defineEmits(['closeMobileNav']);

defineProps({
    isVisible: {
        type: Boolean,
        default: false
    }
});
</script>

<style lang="scss" scoped>
.mb-nav__wrapper {
    height: 100%;

    display: flex;
    flex-direction: column;
    padding: 22px var(--viewport-padding);
}

.mb-nav-close-btn {
    min-height: 40px;
    align-self: flex-end;
    display: flex;
    align-items: center;
}

.mobile-nav {
    flex: 1;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2.5rem;

    margin: 0 auto;
}

.nav-link {
    color: currentColor;
    text-decoration: none;

    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: 1px;

    &.router-link-active {
        color: hsl(var(--color-primary));
        
        filter: drop-shadow(0 0 15px hsl(var(--color-primary), 0.5)) 
                drop-shadow(0 0 25px hsl(var(--color-primary)));
        transition: all 0.3s ease;
    }
}
</style>