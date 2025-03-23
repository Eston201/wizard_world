import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Ripple from '../../../src/components/Decorative/Ripple.vue';

describe('Ripple', () => {
    it('renders correctly with default props', () => {
        const wrapper = mount(Ripple);
        // 5 ripples by defaule
        const ripples = wrapper.findAll('.ripple')
        expect(ripples.length).toBe(5);
        // Delay
        ripples.forEach((ripple, idx) => {
            expect(ripple.attributes('style')).toBe(`--delay: ${idx + 1}s;`);
        });
    });

    it('renders correctly with supplied props', () => {
        const wrapper = mount(Ripple, {
            props: {
                amount: 10
            }
        });
        const ripples = wrapper.findAll('.ripple')
        expect(ripples.length).toBe(10);
        ripples.forEach((ripple, idx) => {
            expect(ripple.attributes('style')).toBe(`--delay: ${idx + 1}s;`);
        });
    });
});

