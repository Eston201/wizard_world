import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import DecorativeTitle from '../../src/components/DecorativeTitle.vue';
import DecorativeBoxChain from '../../src/components/DecorativeBoxChain.vue';

describe('DecorativeTitle', () => {
    it('renders correctly', () => {
        const wrapper = mount(DecorativeTitle, {
            slots: {
                default: 'Test Default Slot'
            }
        });
        expect(wrapper.html()).toContain('Test Default Slot');
        expect(wrapper.findAllComponents(DecorativeBoxChain).length).toBe(2); // Two decos on either side
    });
});