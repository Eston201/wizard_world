<template>
    <main class="elixirs-view__wrapper">
        <Tabs :value="difficulty" scrollable>
            <TabList> 
                <Tab
                    v-for="{label, value} in spellDifficulties" 
                    :key="label" 
                    :value="value"
                    @click="$router.push({
                        name: ROUTE_NAMES.ELIXIR_DIFFICULTY,
                        params: {
                            difficulty: value
                        }
                    })"
                >
                    <router-link
                        class="difficulty-link"
                        :to="{
                            name: ROUTE_NAMES.ELIXIR_DIFFICULTY,
                            params: {
                                difficulty: value
                            }
                        }"
                    >
                        {{ label }}
                    </router-link>
                </Tab>
            </TabList>
        </Tabs>

        <p v-if="!difficulty">Select A Difficulty</p>
        

        <div class="elixir-child-route__wrapper">
            <router-view></router-view>
            <ScrollTop target="parent"/>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from '@/router/types';
import { useOverFlowToggle } from '@/composables/useOverFlowToggle';
import { Tabs, TabList, Tab, ScrollTop } from 'primevue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const spellDifficulties = [
    {label: 'Unknown', value: 'Unknown'},
    {label: 'Advanced', value: 'Advanced'},
    {label: 'Moderate', value: 'Moderate'},
    {label: 'Beginner', value: 'Beginner'},
    {label: 'Ordinary Wizarding Level', value: 'OrdinaryWizardingLevel'},
    {label: 'One Of A Kind', value: 'OneOfAKind'},
];

const route = useRoute();
const difficulty = computed(() => {
    return (route.params.difficulty || '') as string
});

// Hide fullpage scrolling
useOverFlowToggle();
</script>

<style lang="scss" scoped>
.elixirs-view__wrapper {
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 12px;
    
    overflow: hidden;
    padding-block: 32px;
}

.difficulty-link {
    position: relative;
    color: inherit;
    text-decoration: none;
}


.elixir-child-route__wrapper {
    flex: 1;
    overflow-y: auto;
    padding-right: 12px;
}
</style>