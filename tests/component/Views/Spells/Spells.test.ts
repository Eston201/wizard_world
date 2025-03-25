import { describe, it, beforeEach, vi, expect } from "vitest";
import { mount, VueWrapper} from '@vue/test-utils';
import { useQuery } from "@tanstack/vue-query";
import { ref } from "vue";
import Spells from '../../../../src/views/Spells/Spells.vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { dummySpells } from "../../../common";
import { PhArrowsOut } from "@phosphor-icons/vue";

describe('Houses', () => {
    beforeEach(() => {
        // Reset useQuery
        vi.mocked(useQuery).mockReset();
    });

    it('renders correctly', () => {
        vi.mocked(useQuery).mockReturnValue({
            data: ref(dummySpells),
            isPending: ref(false),
            isError: ref(false),
            isLoading: ref(false),
            isSuccess: ref(true),
            error: ref(null),
        } as any);

        const wrapper = mount(Spells, {
            global: {
                plugins: [PrimeVue, ToastService],
            }
        });

        expect(wrapper.find('.filters__wrapper').exists()).toBe(true);
        expect(wrapper.find('.loading__wrapper').exists()).toBe(true);
        expect(wrapper.find('.spells__wrapper').exists()).toBe(true);
        // There should be two spell types
        const spellTypes = wrapper.findAll('.spell-header > span');
        expect(spellTypes.length).toEqual(2);
        expect(spellTypes[0].text()).toEqual(dummySpells[0].type);
        expect(spellTypes[1].text()).toEqual(dummySpells[1].type);
    });

    it('hides spells when loading', () => {
        vi.mocked(useQuery).mockReturnValue({
            data: ref(dummySpells),
            isPending: ref(true),
            isError: ref(false),
            isLoading: ref(false),
            isSuccess: ref(true),
            error: ref(null),
        } as any);

        const wrapper = mount(Spells, {
            global: {
                plugins: [PrimeVue, ToastService],
            }
        });
        expect(wrapper.find('.filters__wrapper').isVisible()).toBe(true); // Filters unaffected
        // loading visible
        expect(wrapper.find('.loading__wrapper').isVisible()).toBe(true);
        // spells hidden
        expect(wrapper.find('.spells__wrapper').isVisible()).toBe(false);
    });

    it('hides loader and shows spells when finish fetching data', () => {
        vi.mocked(useQuery).mockReturnValue({
            data: ref(dummySpells),
            isPending: ref(false),
            isError: ref(false),
            isLoading: ref(false),
            isSuccess: ref(true),
            error: ref(null),
        } as any);

        const wrapper = mount(Spells, {
            global: {
                plugins: [PrimeVue, ToastService],
            }
        });
        expect(wrapper.find('.filters__wrapper').isVisible()).toBe(true); // Filters unaffected
        // loading visible
        expect(wrapper.find('.loading__wrapper').isVisible()).toBe(false);
        // spells hidden
        expect(wrapper.find('.spells__wrapper').isVisible()).toBe(true);
    });

    it('formats spell types correctly', () => {
        vi.mocked(useQuery).mockReturnValue({
            data: ref([{
                id: "2123-32312-3123",
                name: "testing spell",
                incantation: "IDoTest",
                effect: "calls a test",
                canBeVerbal: false,
                type: "magicalTransportation",
                light: "heavy",
                creator: "vitest"
            }]),
            isPending: ref(false),
            isError: ref(false),
            isLoading: ref(false),
            isSuccess: ref(true),
            error: ref(null),
        } as any);

        const wrapper = mount(Spells, {
            global: {
                plugins: [PrimeVue, ToastService],
            }
        });
        
        expect(wrapper.find('.spell-header > span').text()).toBe('magical Transportation');
        const icon = wrapper.getComponent(PhArrowsOut) as unknown as VueWrapper;
        expect(icon.exists()).toBe(true);
    });

    // describe("Filters", () => {

    // });
});