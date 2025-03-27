<template>
  <div 
    class="app-content__wrapper"
    :style="{overflow: (appStore.overFlowHidden) ? 'hidden' : 'revert'}"
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

const appStore = useAppStore();
</script>

<style lang="scss" scoped>
.app-content__wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;

  &.hide-overflow {
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
