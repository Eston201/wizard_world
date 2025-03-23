import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import FloatingCandle from '../../../src/components/Decorative/FloatingCandle.vue';

describe('FloatingCandle', () => {
    it('it renders correctly with defaults', () => {
        const wrapper = mount(FloatingCandle);
        expect(wrapper.attributes('style')).toBe(`--candle-left: 0; --candle-top: 0; --float-delay: 0s;`);
        expect(wrapper.find('img').exists()).toBe(true);
        expect(wrapper.find('img').attributes('style')).toBe(`--candle-rotation: 0deg;`);
    });

    it('renders correctly with given props', () => {
        const wrapper = mount(FloatingCandle, {
            props: {
                x: '10px',
                y: '20%',
                rotation: 45,
                floatDelay: 1,
            }
        });

        expect(wrapper.attributes('style')).toBe(`--candle-left: 10px; --candle-top: 20%; --float-delay: 1s;`);
        expect(wrapper.find('img').exists()).toBe(true);
        expect(wrapper.find('img').attributes('style')).toBe(`--candle-rotation: 45deg;`);
    });
});