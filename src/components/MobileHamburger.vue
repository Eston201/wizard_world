<template>
    <Button v-slot="slotProps" asChild>
        <button
            v-bind="slotProps.a11yAttrs"
            class="mobile-hamburger-btn"
        >
            <div :class="['bars', {'close': isOpened}]">
                <div 
                    class="broom-bar"
                    v-for="x of 3"
                    :key="`broom-bar-${x}`"
                >
                    <WizardBroomIcon :size="iconSize"/>
                </div>
                <VisuallyHidden>Open Menu</VisuallyHidden>
            </div>
        </button>
    </Button>
</template>

<script setup lang="ts">
import { Button } from 'primevue';
import WizardBroomIcon from './WizardBroomIcon.vue';
import VisuallyHidden from './VisuallyHidden.vue';

defineProps({
    isOpened: {
        type: Boolean,
        default: false
    }
});

const iconSize = 18;
</script>

<style lang="scss" scoped>
.mobile-hamburger-btn {
    padding: 6px 12px;
    background-color: transparent;
    border: none;
    cursor: pointer;
}

.bars {
    display: flex;
    flex-direction: column;
    align-items: center;

    .broom-bar {
        transform: rotate(45deg);
        margin-block: -4px;
        
        &:nth-of-type(even) {
            transform: rotate(-135deg);
        }
    }

    // Close state style
    &.close {
        flex-direction: row;

        .broom-bar:nth-of-type(1) {
            transform: rotate(-90deg) translate(0px, 10px);
        }
        .broom-bar:nth-of-type(2) {
            display: none;
        }
        .broom-bar:nth-of-type(3) {
            transform: rotate(0deg) translate(-10px, 0px);
        }
    }
}
</style>