<template>
    <div 
        class="box-chain__wrapper" 
        :style="{'--dimensions': `${boxDimensions}px`}"
    >
        <div
            class="box"
            v-for="x of numBoxes"
            :key="`deco-box-${x}`"
        >
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps({
    boxDimensions: {
        type: Number,
        default: 10
    },
    numBoxes: {
        type: Number,
        default: 3
    }
})
</script>

<style lang="scss" scoped>
.box-chain__wrapper {
    display: flex;

    .box {
        width: var(--dimensions);
        height: var(--dimensions);
        transform: rotate(45deg);
        border: 1px solid currentColor;

        &:nth-of-type(even) {
            margin-inline: -2px;
            border-color: hsl(var(--color-primary));
        }
    }
}
</style>