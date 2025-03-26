<template>
    <main class="auth-page__wrapper">
        <!-- Floating Candles -->
        <FloatingCandle
            v-for="({x, y, rotation, size}, idx) of floatingCandles"
            :key="idx"
            :floatDelay="idx * 2 * (size || 1)"
            :x="x"
            :y="y"
            :rotation="rotation"
            :style="{scale: (size) ? size : 1}"
        />

        <!-- Forms -->
        <div class="forms-wrapper">
            <LoginForm :onSubmitFn="handleLogin"/>
        </div>
    </main>
</template>

<script setup lang="ts">
import LoginForm from '@/components/Authentication/LoginForm.vue';
import FloatingCandle from '@/components/Decorative/FloatingCandle.vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { onMounted } from 'vue';
import { useUserStore, type TRole } from '@/store/user';

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();
const userStore = useUserStore();

onMounted(() => {
    // Cheap way to stay logged in 
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
        console.log(loggedInUser);
        authStore.isAuthenticated = true;
        userStore.setUser(loggedInUser as TRole, loggedInUser);
        router.push('/');
    }
})

function handleLogin(username: string, password: string) {
    const validAuth = authStore.login(username, password);

    if (validAuth) router.push({name: 'home'});
    else {
        toast.add({ 
            severity: 'error', 
            summary: 'Login Error', 
            detail: 'Invalid Login Credentials', 
            life: 3000 
        });
    }
}

// Floating candles Decoration
const floatingCandles = [
    {x: '10%', y: '60%', rotation: 15},
    {x: '70%', y: '10%', rotation: -15},
    {x: '80%', y: '85%', rotation: 0},
    {x: '10%', y: '5%', rotation: -10, size: 0.5},
    {x: '40%', y: '65%', rotation: -10, size: 0.3},
];
</script>

<style lang="scss" scoped>
.auth-page__wrapper {
    position: relative;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    overflow: hidden;
}

h1 {
    font-family: var(--harry-p);
    font-size: 4rem;
    color: hsl(var(--color-primary));
}

.forms-wrapper {
    width: 100%;
}
</style>