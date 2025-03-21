import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { definePreset } from '@primeuix/themes';
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice'
import Aura from '@primeuix/themes/aura';
import router from './router';
import App from './App.vue';

import './styles/style.scss';

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{amber.50}',
            100: '{amber.100}',
            200: '{amber.200}',
            300: '{amber.300}',
            400: '{amber.400}',
            500: '{amber.500}',
            600: '{amber.600}',
            700: '{amber.700}',
            800: '{amber.800}',
            900: '{amber.900}',
            950: '{amber.950}'
        }
    }
});

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(VueQueryPlugin);
app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
    }
});
app.use(ToastService);
app.use(router);
app.mount('#app');