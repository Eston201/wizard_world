<template>
    <main class="home-page__wrapper">
        <NavigationCard
            class="nav-card"
            v-for="{label, route, imgSrc, order} of navigationCards"
            :style="{order}"
            :key="route"
            :routeName="route" 
            :backgroundImgPath="`/images/home/${imgSrc}`"
        >
            {{ label }}
        </NavigationCard>
    </main>
</template>

<script setup lang="ts">
import NavigationCard from '@/components/NavigationCard.vue';

const navigationCards = [
    {
        label: "Houses",
        route: 'houses',
        imgSrc: 'HogwartsLogo.jpg',
        order: 1,
    },
    {
        label: "Spells",
        route: 'spells',
        imgSrc: 'Spells_desktop_logo.jpg',
        order: 0,
    },
    {
        label: "Elixirs",
        route: 'elixirs',
        imgSrc: 'Potions_desktop_logo.jpg',
        order: 2,
    },
]
</script>

<style lang="scss" scoped>
.home-page__wrapper {
    height: 100%;
    padding-bottom: var(--viewport-padding);

    display: flex;
    flex-wrap: wrap;        
    justify-content: center;
    align-items: center;
    gap: 22px;
}

.nav-card {
    flex: 1;
    min-width: 200px;
    max-width: 300px;
}
</style>