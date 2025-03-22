import { mount, VueWrapper } from '@vue/test-utils';
import { describe, it, expect, vi, beforeAll } from 'vitest'
import PrimeVue from 'primevue/config';
import LoginForm from '../../src/components/LoginForm.vue';

describe('LoginForm', () => {
    let wrapper: VueWrapper;
    const onSubmitFn = vi.fn();
    
    beforeAll(() => {
        wrapper = mount(LoginForm, {
            props: {
                onSubmitFn
            },
            global: {
                plugins: [PrimeVue],
            }
        });
    })

    it('it renders correctly', () => {
        // Ripple & Icon
        expect(wrapper.findComponent({name: 'Ripple'}).exists()).toBe(true);
        expect(wrapper.findComponent({name: 'SortingHatIcon'}).exists()).toBe(true);
        // Title
        expect(wrapper.find('h2').text()).toContain('Login');
        // Form items
        expect(wrapper.find('form').exists()).toBe(true);
        expect(wrapper.find('#login-username').exists()).toBe(true);
        expect(wrapper.find('label[for="login-username"]').exists()).toBe(true);
        expect(wrapper.find('#login-password').exists()).toBe(true);
        expect(wrapper.find('label[for="login-password"]').exists()).toBe(true);
        // button
        expect(wrapper.find('.submit-btn').text()).toBe('Login');
    });

    it('will submit the form with correct username and password ', async () => {
        // Set username & password
        await wrapper.get('#login-username').setValue('Test User');
        await wrapper.get('input[type="password"]').setValue('Test Password');
        // Submit
        await wrapper.find('form').trigger('submit');
        expect(onSubmitFn.mock.calls[0]).toEqual(['Test User', 'Test Password']);
    });
});
