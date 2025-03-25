<template>
  <div class="app-content__wrapper">
    <Header/>

    <div class="router__wrapper">
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
</script>

<style lang="scss" scoped>
.app-content__wrapper {
  min-height: 100%;
  display: flex;
  flex-direction: column;

  .router__wrapper {
    flex: 1;
    padding-inline: var(--viewport-padding);
    display: flex;
    flex-direction: column; // So that we can get full height route containers :) 
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
