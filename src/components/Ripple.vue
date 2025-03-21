<template>
    <div class="ripples__wrapper">
        <div 
            class="ripple"
            v-for="x of amount" :key="x + 'ripple'"
            :style="{'--delay': `${x * 0.5}s`}"
        >
        </div>
        <slot></slot>
    </div>
</template>

<script setup>
defineProps({
    amount: {
        type: Number,
        default: 5
    }
});
</script>

<style lang="scss" scoped>
.ripples__wrapper {
    position: relative;
}

.ripple {
    height: 100%;
    width: 100%;

    position: absolute;
    background-color: rgb(27, 27, 27);
    border-radius: 50%;
    z-index: -1;
    opacity: 1;
    transform: scale(0.2);
    animation: fadeGrow 3s var(--delay) linear infinite;
}

@keyframes fadeGrow {
    from {
        opacity: 1;
        transform: scale(0.2);
    }

    to {
        opacity: 0;
        transform: scale(1.2);
    }
}
</style>