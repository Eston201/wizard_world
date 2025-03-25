import { describe, it, beforeEach, vi, expect } from "vitest";
import { mount, VueWrapper } from '@vue/test-utils';
import { createRouter, createWebHistory, Router} from 'vue-router';
import { useQuery } from "@tanstack/vue-query";
import { routes } from '../../../../src/router/routes';
import { createPinia } from "pinia";
import { useWizardWorldHouseStore } from '../../../../src/store/wizardWorldHouse';
import { dummyHouses } from '../../../common';
import HouseDetail from '../../../../src/views/Houses/HouseDetail.vue';

let router: Router;
describe('House Detail', () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
        // Reset useQuery
        vi.mocked(useQuery).mockReset();
        // Fresh router
        router = createRouter({
            history: createWebHistory(),
            routes
        });

        wrapper = mount(HouseDetail, {
            global: {
                plugins: [router, createPinia()],
            }
        });
    });

    it('will render house not found when no house in state', () => {
        expect(wrapper.find('.house-not-found__wrapper').exists()).toBe(true);
    });

    it('will render house details and css variables correctly when house in state', async () => {
        const house = useWizardWorldHouseStore();
        house.setSelectedHouse(dummyHouses[0]);
        await wrapper.vm.$nextTick();
        // card
        const detailCard = wrapper.find('.house-detail-card__wrapper');
        expect(detailCard.exists()).toBe(true);
        // css variables
        expect(detailCard.attributes('style')).toEqual('--house-primary-color: var(--test-1-primary); --house-secondary-color: var(--test-1-secondary);')        
        expect(wrapper.find('.house-header > h2').text()).toEqual(dummyHouses[0].name);
    });
});