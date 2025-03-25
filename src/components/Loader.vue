<template>
    <Teleport to="body">
        <div class="loader-overlay" v-if="isLoading">
            <div class="loader-content">

                <div class="icon__wrapper">
                    <slot name="icon">
                        <Ripple>
                            <MotionSortingHatIcon 
                                :size="90"
                                :initial="{scale: 0.8}"
                                :animate="{scale: 1.2}"
                                :transition="{
                                    repeat: Infinity,
                                    duration: 1,
                                    repeatType: 'reverse',
                                }"
                            />
                        </Ripple>
                    </slot>
                </div>

                <span class="loading-text">
                    <slot>
                        Loading...
                    </slot>
                </span>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import SortingHatIcon from './Icons/SortingHatIcon.vue';
import Ripple from './Decorative/Ripple.vue';
import { motion } from 'motion-v';

const MotionSortingHatIcon = motion.create(SortingHatIcon);

defineProps({
    isLoading: {
        type: Boolean,
        required: true,
        default: false
    },
});
</script>

<style lang="scss" scoped>
.loader-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(1.5px);

    display: flex;
    justify-content: center;
    align-items: center;
}

.loader-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.loading-text {
    font-size: 1.25rem;
    letter-spacing: 1px;
}
</style>