import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import DecorativeBoxChain from '../../src/components/DecorativeBoxChain.vue';

describe('DecorativeBoxChain', () => {
    it('renders correctly with default props', () => {
        const wrapper = mount(DecorativeBoxChain);
        expect(wrapper.attributes('style')).toBe('--dimensions: 10px;');
        expect(wrapper.findAll('.box').length).toBe(3);
    });

    it('renders correctly with supplied props', () => {
        const wrapper = mount(DecorativeBoxChain, {
            props: {
                numBoxes: 10,
                boxDimensions: 20
            }
        });
        expect(wrapper.attributes('style')).toBe('--dimensions: 20px;');
        expect(wrapper.findAll('.box').length).toBe(10);
    });
});