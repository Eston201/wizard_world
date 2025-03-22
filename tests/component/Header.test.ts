import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeAll, beforeEach, afterEach, afterAll, } from 'vitest';
import { createRouter, createWebHistory, Router } from 'vue-router';
import { createTestingPinia } from '@pinia/testing'
import { routes } from '../../src/router/routes';
import { useAuthStore } from '../../src/store/auth';
import { ROUTE_NAMES } from '../../src/router/types';
import Header from '../../src/components/Header.vue';

describe('Header', () => {
    let router: Router;
    let wrapper: VueWrapper;
    let authStore: ReturnType<typeof useAuthStore>;

    beforeAll(async () => {
        router = createRouter({
            history: createWebHistory(),
            routes
        });
    
        wrapper = mount(Header, {
            global: {
                plugins: [router, createTestingPinia()],
            }
        });
        authStore = useAuthStore();

        // await router after mounting
        await router.isReady();
    });

    it('renders correctly for unauthenticated users', async () => {
        expect(wrapper.find('header').exists()).toBe(true);
        expect(wrapper.find('nav').exists()).toBe(false); // not logged in, nav should be hidden except for site logo
    });

    describe('Authenticated Header', () => {
        beforeAll(() => {
            authStore.isAuthenticated = true;
        });

        it('renders correctly authenticated and on home page', async () => {
            expect(wrapper.find('nav').exists()).toBe(false); // Is should hide the nav on home page
        });
    
        it('renders nav on a page other than home page', async () => {
            await router.push({name: ROUTE_NAMES.HOUSES});
            await router.isReady();
            expect(wrapper.find('nav').exists()).toBe(true);
        });
    
        it('routes to home via site anchor', async () => {
            await wrapper.find('.home-link').trigger('click');
            await flushPromises();
            expect(router.currentRoute.value.name).toBe(ROUTE_NAMES.HOME);
            expect(wrapper.find('nav').exists()).toBe(false);
        });
    });
});