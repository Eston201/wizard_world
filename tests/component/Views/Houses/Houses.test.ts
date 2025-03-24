import { describe, it, beforeEach, vi, expect } from "vitest";
import { mount, VueWrapper } from '@vue/test-utils';
import { createRouter, createWebHistory, Router} from 'vue-router';
import { createTestingPinia } from '@pinia/testing';
import { useQuery } from "@tanstack/vue-query";
import { IHouse } from "../../../../src/api/wizard-world/types";
import { routes } from '../../../../src/router/routes';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice'
import { ROUTE_NAMES } from "../../../../src/router/types";
import APP from '../../../../src/App.vue';
import { useWizardWorldHouseStore } from '../../../../src/store/wizardWorldHouse';

const dummyHouses: IHouse[] = [
    {
        id: 'test 1',
        name: "test 1",
        houseColours: "black and white",
        founder: "test 1",
        animal: "test 1",
        element: "test 1",
        ghost: "test 1",
        commonRoom: "",
        heads: [],
        traits: []
    },
    {
        id: 'test 2',
        name: "test 2",
        houseColours: "blue and red",
        founder: "test 2",
        animal: "test 2",
        element: "test 2",
        ghost: "test 2",
        commonRoom: "",
        heads: [],
        traits: []
    },
];

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
                plugins: [router, createTestingPinia(), PrimeVue, ToastService],
            }
        });
    });

    it('renders correctly', async () => {
        vi.mocked(useQuery).mockReturnValue({
            data: dummyHouses,
            isPending: false,
            isError: false,
            isLoading: false,
            isSuccess: true,
            error: null,
        } as any);

        await router.push({name: ROUTE_NAMES.HOUSES});
        await router.isReady();

        const figures = wrapper.findAll('figure');
        expect(figures.length).toEqual(2); // There should be two carousel items based on the mock data
    });

    it('will show valid house for valid route id', async () => {
        vi.mocked(useQuery).mockReturnValue({
            data: dummyHouses,
            isPending: false,
            isError: false,
            isLoading: false,
            isSuccess: true,
            error: null,
        } as any);

        await router.push({
            name: ROUTE_NAMES.HOUSE_DETAIL, 
            params: {
                id: dummyHouses[0].name
            }
        });
        await router.isReady();
        
        const house = useWizardWorldHouseStore();
        house.selectedHouse = dummyHouses[0];
        await wrapper.vm.$nextTick();

        expect(wrapper.find('.house-detail-card__wrapper').exists()).toBe(true);
    });

    it('will show error message for invalid house id in route', async () => {
        vi.mocked(useQuery).mockReturnValue({
            data: dummyHouses,
            isPending: false,
            isError: false,
            isLoading: false,
            isSuccess: true,
            error: null,
        } as any);

        await router.push({
            name: ROUTE_NAMES.HOUSE_DETAIL, 
            params: {
                id: 'Not Valid'
            }
        });
        await router.isReady();
        expect(wrapper.find('.house-not-found__wrapper').exists()).toBe(true);
    });
});