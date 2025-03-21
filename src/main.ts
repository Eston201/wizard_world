import { createApp } from 'vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { definePreset } from '@primeuix/themes';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import router from './router';
import App from './App.vue';
import './styles/style.scss';

const MyPreset = definePreset(Aura, {})

const app = createApp(App);
app.use(VueQueryPlugin);
app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
    }
});
app.use(router);
app.mount('#app');