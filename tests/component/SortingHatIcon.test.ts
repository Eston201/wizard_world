import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SortingHatIcon from '../../src/components/SortingHatIcon.vue';

describe('SortingHatIcon', () => {
    it('it renders defaults correctly', () => {
        const wrapper = mount(SortingHatIcon);
        const defaultSize = 60;
        const defaultStrokeWidth = 4.5;
        expect(wrapper.attributes('style')).toBe(`--dimensions: ${defaultSize}px;`);
        expect(wrapper.find('svg').exists()).toBe(true);
        expect(wrapper.findAll(`g[stroke-width="${defaultStrokeWidth}"]`).length).toBe(2);
    });

    it('renders correctly with given props', () => {
        const wrapper = mount(SortingHatIcon, {
            props: {
                size: 30,
                strokeWidth: 2
            }
        });
        expect(wrapper.attributes('style')).toBe(`--dimensions: 30px;`);
        expect(wrapper.find('svg').exists()).toBe(true);
        expect(wrapper.findAll(`g[stroke-width="2"]`).length).toBe(2);
    });
});