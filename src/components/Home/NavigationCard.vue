<template>
    <motion.article
        tabindex="-1"
        class="navigation-card"
        :style="{backgroundImage: `url(${backgroundImgPath})`}"
        :whileHover="{ y: -12, backgroundPosition: '50% 50%',  rotate: -3, scale: 0.95 }"
        :whilePress="{ scale: 1.1 }"
        :transition="{type: 'spring', duration: 0.4, damping: 10}"
        @click.stop="$router.push({name: routeName})"
    >
        <RouterLink class="card-link" :to="{name: routeName}">
            <slot>{{routeName}}</slot>
        </RouterLink>
    </motion.article>
</template>

<script setup lang="ts">
import { motion } from 'motion-v';

defineProps({
    routeName: {
        type: String,
        required: true
    },
    backgroundImgPath: {
        type: String,
        required: true
    }
});
</script>

<style lang="scss" scoped>
.navigation-card {
    position: relative;
    height: 350px;

    border: 1px solid hsl(var(--color-primary), 0.2);
    border-radius: 4px;
    background-position: 50% 90%;
    background-repeat: no-repeat;
    cursor: pointer;
}

.card-link {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);

    color: hsl(220, 9%, 94%);
    text-decoration: none;
    font-size: 2.5rem;
    font-family: var(--harry-p);
}
</style>