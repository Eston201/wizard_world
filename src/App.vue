<template>
  <div 
    :class="[
      'app-content__wrapper', 
      {'hide-overflow': appStore.overFlowHidden}]
    "
  >
    <Header/>

    <div 
      class="router__wrapper"
      :style="{overflow: (appStore.overFlowHidden) ? 'auto' : 'revert'}"
    >
      <router-view v-slot="{ Component }">
        <transition name="fadeBlur" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

    <Toast class="toast" position="top-right"/>
  </div>
</template>

<script setup lang="ts">
import { Toast } from 'primevue';
import Header from '@/components/Header/Header.vue';
import { useAppStore } from './store/app';
import { onMounted } from 'vue';
import { useAuthStore } from './store/auth';
import { useUserStore, type TRole } from './store/user';

const appStore = useAppStore();
const authStore = useAuthStore();
const userStore = useUserStore();

onMounted(() => {
  // Cheap way to stay logged in on page reload
  const loggedInUser = localStorage.getItem('user');
  if (loggedInUser) {
    authStore.isAuthenticated = true;
    userStore.setUser(loggedInUser as TRole, loggedInUser);
  }
});
</script>

<style lang="scss" scoped>
.app-content__wrapper {
  min-height: 100%;
  display: flex;
  flex-direction: column;

  &.hide-overflow {
    height: 100%;
    overflow: hidden;
  }

  .router__wrapper {
    flex: 1;
    padding-inline: var(--viewport-padding);
  }
}

/* Page Transition */
.fadeBlur-enter-active,
.fadeBlur-leave-active {
  transition: opacity 0.5s ease, filter 0.5s ease;
}

.fadeBlur-enter-from,
.fadeBlur-leave-to {
  opacity: 0;
  filter: blur(10px);
}
</style>
