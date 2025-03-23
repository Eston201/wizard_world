<template>
    <div class="visually-hidden">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.visually-hidden {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
}
</style>