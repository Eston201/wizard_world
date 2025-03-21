<template>
    <div class="header__wrapper">
        <header>
            <RouterLink to="/">Wizward World</RouterLink>

            <nav>    
            </nav>
        </header>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';


</script>

<style lang="scss" scoped>
    .header__wrapper {
        position: sticky;
        top: 0;

        margin-top: 2rem;
        padding-inline: 32px;
    }
</style>