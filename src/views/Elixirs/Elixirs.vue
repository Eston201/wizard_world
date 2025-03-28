<template>
    <main class="elixirs-view__wrapper">
        <Tabs :value="activeDifficulty" scrollable>
            <TabList>
                <Tab
                    v-for="difficulty in ElixirDifficulties" 
                    :key="difficulty" 
                    :value="difficulty"
                    @click="$router.push({
                        name: ROUTE_NAMES.ELIXIR_DIFFICULTY,
                        params: { difficulty }
                    })"
                    :disabled="isElixirDifficultyLocked(difficulty)"
                >
                    <router-link
                        :class="[
                            'difficulty-link', 
                            {'locked': isElixirDifficultyLocked(difficulty)}
                        ]"
                        :to="{
                            name: ROUTE_NAMES.ELIXIR_DIFFICULTY,
                            params: { difficulty }
                        }"
                    >
                        <div class="icon">
                            <PhLock :size="24" weight="light"/>
                        </div>
                        {{ formatCamelCase(difficulty) }}
                    </router-link>
                </Tab>
            </TabList>
        </Tabs>

        <div v-if="!activeDifficulty" class="select-elixir-msg">
            <span>Select A Difficulty</span>
        </div>
        
        <div class="elixir-child-route__wrapper">
            <router-view></router-view>
            <ScrollTop target="parent"/>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ROUTE_NAMES } from '@/router/types';
import { ElixirDifficulties, HeadmasterRestrictedElixirDifficulties, type TElixirDifficulty } from '@/api/wizard-world/utils';
import { useOverFlowToggle } from '@/composables/useOverFlowToggle';
import { Tabs, TabList, Tab, ScrollTop } from 'primevue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { formatCamelCase } from '@/utils/utils';
import { ROLE, useUserStore } from '@/store/user';
import { PhLock } from '@phosphor-icons/vue';

// Hide fullpage scrolling
useOverFlowToggle();
const route = useRoute();
const userStore = useUserStore();

const activeDifficulty = computed(() => {
    return (route.params.difficulty || '') as string
});

function isElixirDifficultyLocked(difficulty: TElixirDifficulty) {
    if (
        userStore.user.role === ROLE.EXPLORER && 
        HeadmasterRestrictedElixirDifficulties.includes(difficulty)
    ) return true;
    return false;
}
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

    .icon {
        display: none;
    }

    &.locked {
        display: flex;
        gap: 8px;

        .icon {
            display: revert;
        }
    }
}

.select-elixir-msg {
    flex: 1;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 1.25rem;
    letter-spacing: 1px;
}

.elixir-child-route__wrapper {
    flex: 1;
    overflow-y: auto;
    padding-right: 12px;
}
</style>