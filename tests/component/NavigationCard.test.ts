import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import { createRouter, createWebHistory, Router } from 'vue-router';
import { routes } from '../../src/router/routes';
import { ROUTE_NAMES } from '../../src/router/types';
import NavigationCard from '../../src/components/NavigationCard.vue';

describe('NavigationCard', () => {
    let router: Router;

    beforeEach(async () => {
        router = createRouter({
            history: createWebHistory(),
            routes
        });
    });

    it('renders correctly', async () => {
        const wrapper = mount(NavigationCard, {
            global: {
                plugins: [router],
            },
            props: {
                routeName: ROUTE_NAMES.HOUSES,
                backgroundImgPath: '/images/home/HogwartsLogo.jpg'
            }
        });

        expect(wrapper.attributes('style')).toEqual('background-image: url(/images/home/HogwartsLogo.jpg);');
        const anchor = wrapper.find('a');
        expect(anchor.exists()).toBe(true);
        expect(anchor.text()).toEqual(ROUTE_NAMES.HOUSES);
    });

    it('can route via card click', async () => {
        const wrapper = mount(NavigationCard, {
            global: {
                plugins: [router],
            },
            props: {
                routeName: ROUTE_NAMES.SPELLS,
                backgroundImgPath: '/images/home/HogwartsLogo.jpg'
            }
        });
        await wrapper.trigger('click');
        await router.isReady();
        expect(router.currentRoute.value.name).toEqual(ROUTE_NAMES.SPELLS);
    });

    it('can route via anchor', async () => {
        const wrapper = mount(NavigationCard, {
            global: {
                plugins: [router],
            },
            props: {
                routeName: ROUTE_NAMES.ELIXIRS,
                backgroundImgPath: '/images/home/HogwartsLogo.jpg'
            }
        });
        await wrapper.find('a').trigger('click');
        await router.isReady();
        expect(router.currentRoute.value.name).toEqual(ROUTE_NAMES.ELIXIRS);
    });
});