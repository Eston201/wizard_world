<template>
  <div class="app-content__wrapper">
    <Header/>

    <div class="router__wrapper">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header/Header.vue';
</script>

<style lang="scss" scoped>
.app-content__wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;

  .router__wrapper {
    flex: 1;
  }
}
</style>
