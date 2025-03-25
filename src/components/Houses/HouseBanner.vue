<template>
    <figure 
        :class="['house-banner', {'active-banner': active}]" 
        :style="bannerStyles"
    >
        <div class="house-img__wrapper">
            <img :src="`/images/houses/${houseName}.png`" :alt="houseName + 'logo'" />
        </div>

        <figcaption class="banner-caption">
            <slot>{{ houseName }}</slot>
        </figcaption>
    </figure>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    active: {
        type: Boolean,
        default: false
    },
    houseName: {
        type: String,
        required: true
    },
});

const bannerStyles = computed(() => {
    const primary = `var(--${props.houseName}-primary)`;
    const lightPrimary = `var(--${props.houseName}-primary-30)`;
    return {
        '--banner-active-color': (props.active) ? primary : lightPrimary,
        '--banner-shadow-color': lightPrimary
    };
});

</script>

<style lang="scss" scoped>
.house-banner {
    height: 100%;
    width: 90%;
    margin: 0 auto;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    padding: 6px 22px;
    border-radius: 6px;
    border: 1px solid var(--banner-active-color);
    cursor: pointer;
    transition: all 0.2s ease;

    --drop-shadow: drop-shadow(0 0 10px var(--banner-shadow-color)) 
                    drop-shadow(0 0 20px var(--banner-shadow-color));
    &:hover {
        filter: var(--drop-shadow);
    }

    &.active-banner {
        filter: var(--drop-shadow);
    }
}

.house-img__wrapper {
    flex: 1;
    max-width: 125px;

    img {
        height: 100%;
        object-fit: cover;
    }
}

.banner-caption {
    width: 100%;
}
</style>