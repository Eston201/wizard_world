import { describe, it, beforeEach, vi, expect } from "vitest";
import { flushPromises, mount, VueWrapper } from '@vue/test-utils';
import { createRouter, createWebHistory, Router} from 'vue-router';
import { useQuery } from "@tanstack/vue-query";
import { routes } from '../../../../src/router/routes';
import { ROUTE_NAMES } from "../../../../src/router/types";
import { createPinia } from "pinia";
import { useWizardWorldHouseStore } from '../../../../src/store/wizardWorldHouse';
import { ref } from "vue";
import APP from '../../../../src/App.vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
// @ts-ignore
import { dummyHouses } from '../../../common';

let router: Router;
describe('Houses', () => {
    let wrapper: VueWrapper;

    beforeEach(() => {
        // Reset useQuery
        vi.mocked(useQuery).mockReset();
        // Fresh router
        router = createRouter({
            history: createWebHistory(),
            routes
        });

        wrapper = mount(APP, {
            global: {
                plugins: [router, createPinia(), PrimeVue, ToastService],
            }
        });
    });

    it('renders correctly', async () => {
        vi.mocked(useQuery).mockReturnValue({
            data: ref(dummyHouses),
            isPending: ref(false),
            isError: ref(false),
            isLoading: ref(false),
            isSuccess: ref(true),
            error: ref(null),
        } as any);

        await router.push({name: ROUTE_NAMES.HOUSES});
        await router.isReady();

        const figures = wrapper.findAll('figure');
        expect(figures.length).toEqual(2); // There should be two carousel items based on the mock data
        expect(wrapper.find('.carousel__wrapper > p').exists()).toBe(true); // Select a house should be in DOM
    });

    it('will show valid house for valid route id', async () => {
        const isPending = ref(true);
        vi.mocked(useQuery).mockReturnValue({
            data: ref(dummyHouses),
            isPending,
            isError: ref(false),
            isLoading: ref(false),
            isSuccess: ref(true),
            error: ref(null),
        } as any);

        await router.push({
            name: ROUTE_NAMES.HOUSE_DETAIL, 
            params: {
                id: dummyHouses[0].slug
            }
        });
        await router.isReady();
        expect(router.currentRoute.value.params.id).toEqual(dummyHouses[0].slug);
        // Trigger the watcher
        isPending.value = false;
        await wrapper.vm.$nextTick(); // wait for DOM to update

        const house = useWizardWorldHouseStore();
        expect(house.selectedHouse).toEqual(dummyHouses[0]);
        expect(wrapper.find('.house-detail-card__wrapper').exists()).toBe(true); // detail card should be shown
    });

    it('will show error message for invalid house id in route', async () => {
        const isPending = ref(true);
        vi.mocked(useQuery).mockReturnValue({
            data: ref(dummyHouses),
            isPending,
            isError: ref(false),
            isLoading: ref(false),
            isSuccess: ref(true),
            error: ref(null),
        } as any);

        const paramId = "Invalid-House-Id";
        await router.push({
            name: ROUTE_NAMES.HOUSE_DETAIL, 
            params: {
                id: paramId
            }
        });
        await router.isReady();
        expect(router.currentRoute.value.params.id).toEqual(paramId);

        // Trigger the watcher
        isPending.value = false;
        await wrapper.vm.$nextTick(); // wait for DOM to update

        const house = useWizardWorldHouseStore();
        expect(house.selectedHouse).toBeUndefined(); // House should not be set
        expect(wrapper.find('.house-not-found__wrapper').exists()).toBe(true); // house not found card should be shown
    });

    it('sets house store and routes correctly on carousel card click', async () => {
        vi.mocked(useQuery).mockReturnValue({
            data: ref(dummyHouses),
            isPending: ref(false),
            isError: ref(false),
            isLoading: ref(false),
            isSuccess: ref(true),
            error: ref(null),
        } as any);

        await router.push({name: ROUTE_NAMES.HOUSES});
        await router.isReady();

        const testHouse1 = wrapper.findAll('figure')[0];
        await testHouse1.trigger('click');
        await flushPromises();

        expect(router.currentRoute.value.name).toEqual(ROUTE_NAMES.HOUSE_DETAIL);
        expect(router.currentRoute.value.params.id).toEqual(dummyHouses[0].slug);
        
        const house = useWizardWorldHouseStore();
        expect(house.selectedHouse).toEqual(dummyHouses[0]);
        expect(wrapper.find('.house-header > h2').text()).toEqual('test 1');
    });

    it('sets house store and routes correctly on router link click', async () => {
        vi.mocked(useQuery).mockReturnValue({
            data: ref(dummyHouses),
            isPending: ref(false),
            isError: ref(false),
            isLoading: ref(false),
            isSuccess: ref(true),
            error: ref(null),
        } as any);

        await router.push({name: ROUTE_NAMES.HOUSES});
        await router.isReady();

        await wrapper.find('a[href="/houses/test-2"]').trigger('click');
        await flushPromises();

        const house = useWizardWorldHouseStore();
        expect(house.selectedHouse).toEqual(dummyHouses[1]);
        expect(wrapper.find('.house-header > h2').text()).toEqual('test 2');
    });
});