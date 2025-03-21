<template>
    <div class="decorative-title__wrapper">
        <div class="deco">
            <div class="line"></div>
            <div class="deco-box__wrapper">
                <div class="box"></div>
                <div class="box middle"></div>
                <div class="box"></div>
            </div>
        </div>

        <slot></slot>

        <div class="deco">
            <div class="line"></div>
            <div class="deco-box__wrapper">
                <div class="box"></div>
                <div class="box middle"></div>
                <div class="box"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
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

.deco-box__wrapper {
    display: flex;

    .box {
        --dimensions: 10px;
        width: var(--dimensions);
        height: var(--dimensions);
        transform: rotate(45deg);
        border: 1px solid currentColor;
    }

    .box.middle {
        margin-inline: -2px;
        border-color: hsl(var(--color-primary));
    }
}
</style>