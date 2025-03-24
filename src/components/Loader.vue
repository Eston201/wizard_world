<template>
    <Teleport to="body">
        <div class="loader-overlay" v-if="loading">
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
import { ref, watch } from 'vue';

const MotionSortingHatIcon = motion.create(SortingHatIcon);

const loading = ref(false);

const props = defineProps({
    isLoading: {
        type: Boolean,
        required: true,
        default: false
    },
    delay: {
        type: Number, // Delay in ms
        default: 0
    }
});

// Set a delay before showing the loader
// This can prevent the loading to show up immediatly 
// useful for tanstack cached data fetching
watch(() => props.isLoading, (value) => {
    if (value) {
        setTimeout(() => {
            loading.value = true;
        }, props.delay);
    }
    else {
        loading.value = false;
    }
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