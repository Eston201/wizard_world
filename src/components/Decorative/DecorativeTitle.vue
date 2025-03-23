<template>
    <div class="decorative-title__wrapper">
        <div class="deco">
            <div class="line"></div>
            <DecorativeBoxChain/>
        </div>

        <slot></slot>

        <div class="deco">
            <div class="line"></div>
            <DecorativeBoxChain/>
        </div>
    </div>
</template>

<script setup lang="ts">
import DecorativeBoxChain from './DecorativeBoxChain.vue';
</script>

<style lang="scss" scoped>
.decorative-title__wrapper {
    display: flex;
    align-items: center;
    gap: 14px;
}

.deco {
    flex: 1;
    position: relative;

    display: flex;
    align-items: center;
    gap: 8px;
    
    &:last-of-type{
        flex-direction: row-reverse;
    }
}

.line {
    flex: 1;
    height: 1px;
    background-color: hsl(var(--color-primary));
    border-radius: 3px;
}
</style>