import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import WizardBroomIcon from '../../../src/components/Icons/WizardBroomIcon.vue';

describe('WizardBroomIcon', () => {
    it('it renders defaults correctly', () => {
        const wrapper = mount(WizardBroomIcon);
        expect(wrapper.attributes('style')).toBe(`--size: 30px;`);
    });

    it('renders correctly with given props', () => {
        const wrapper = mount(WizardBroomIcon, {
            props: {
                size: 15,
            }
        });
        expect(wrapper.attributes('style')).toBe(`--size: 15px;`);
    });
});