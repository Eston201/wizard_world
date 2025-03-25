import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createRouter, createWebHistory, Router } from 'vue-router';
import { routes } from '../../../../src/router/routes';
import Home from '../../../../src/views/Home/Home.vue'

describe('Home', () => {
    let router: Router;
    let wrapper: VueWrapper;

    beforeAll(async () => {
        router = createRouter({
            history: createWebHistory(),
            routes
        });
    
        wrapper = mount(Home, {
            global: {
                plugins: [router],
            }
        });

        // await router after mounting
        await router.isReady();
    });

    afterAll(() => {
        wrapper.unmount();
    });

    it('renders correclty with 3 nav article cards', () => {
        const navCards = wrapper.findAll('article');
        expect(navCards.length).toBe(3);
    });

    it('sets the order styles of the cards correctly', () => {
        const navCards = wrapper.findAll('article');
        navCards.forEach((card) => {
            const style = card.attributes('style');
            const orderValue = style?.match(/--order:\s*(\d+);/)?.[1];
            if (card.text().includes('Houses')) {
                expect(orderValue).toEqual('1')
            }
            else if(card.text().includes('Spells')) {
                expect(orderValue).toEqual('0');
            }
            else if(card.text().includes('Elixirs')) {
                expect(orderValue).toEqual('2');
            }
        });
    });
});