import { mount } from '@vue/test-utils';
import { describe, it, expect} from 'vitest';
import SpellCard from '../../../src/components/Spells/SpellCard.vue';
import { dummySpells } from '../../common';

describe('Spell Card', () => {
    it('will render correctly', () => {
        const wrapper = mount(SpellCard, {
            props: {
                spell: dummySpells[0]
            }
        });
        expect(wrapper.find('h3').exists()).toBe(true);
        expect(wrapper.find('h3').text()).toEqual("testing spell");
        expect(wrapper.text()).toContain('IDoTest');
        expect(wrapper.find('.visually-hidden').exists()).toBe(true);
    });
});