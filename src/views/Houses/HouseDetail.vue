<template>
    <div>
        {{ houseStore.selectedHouse }}
    </div>
</template>

<script setup lang="ts">
import { useWizardWorldHouseStore } from '@/store/wizardWorldHouse';

const houseStore = useWizardWorldHouseStore();
</script>

<style scoped>

</style>