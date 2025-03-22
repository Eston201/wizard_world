import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest'
import BaseForm from '../../src/components/BaseForm.vue';

describe("BaseButton", () => {
  it("renders defaults without slots", () => {
    const wrapper = mount(BaseForm);
    // expect icon container to not exist
    expect(wrapper.find('.icon__container').exists()).toBeFalsy();
    expect(wrapper.find('.title__wrapper').text()).toContain("Title");
    expect(wrapper.html()).toContain('Form');
  });

  it('can render slots correctly', () => {
    const wrapper = mount(BaseForm, {
      slots: {
        formIcon: "Test Icon",
        title: "Test Title",
        form: "Test Form"
      }
    });

    expect(wrapper.html()).toContain("Test Icon");
    expect(wrapper.html()).toContain("Test Title");
    expect(wrapper.html()).toContain("Test Form");
  });
});