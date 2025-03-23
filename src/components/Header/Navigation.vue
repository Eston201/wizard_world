<template>
    <nav>
        <template 
            v-for="route of routes"
            :key="route.routeName"
        >
            <slot :route="route"></slot>
        </template>
    </nav>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from '@/router/types';

const routes = [
    {
        label: 'Houses',
        routeName: ROUTE_NAMES.HOUSES,
    },
    {
        label: 'Spells',
        routeName: ROUTE_NAMES.SPELLS,
    },
    {
        label: 'Elixirs',
        routeName: ROUTE_NAMES.ELIXIRS,
    },
];
</script>

<style scoped>
</style>