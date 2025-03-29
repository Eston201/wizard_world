<template>
    <main class="scoreboard-view__wrapper">
        <Loader :isLoading="isPending"/>

        <div class="score-table__wrapper">
            <DataTable :value="houseScoreboard" tableStyle="min-width: 40rem">
                <Column field="name" header="Name">
                    <template #body="slotProps">
                        <div class="house-logo-name__wrapper">
                            <img 
                                :src="`/images/houses/${slotProps.data.name}.png`" 
                                :alt="slotProps.data.name"
                                class="house-logo"
                            />
                            <span>{{ slotProps.data.name }}</span>
                        </div>
                    </template>
                </Column>
                <Column field="score" header="Score"></Column>
                <Column header="Operations" v-if="userStore.isHeadMaster">
                    <template #body="slotProps">
                        <div class="score-operations-btn__wrapper">
                            <Button @click="() => updateHouseScore(slotProps.data, 'decrement')">
                                <span>-</span>
                                <VisuallyHidden>
                                    Decrement Score by 1
                                </VisuallyHidden>
                            </Button>
    
                            <Button @click="() => updateHouseScore(slotProps.data, 'increment')">
                                <span>+</span>
                                <VisuallyHidden>
                                    Increment Score by 1
                                </VisuallyHidden>
                            </Button>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </main>
</template>

<script setup lang="ts">
import { useHousesQuery } from '@/composables/wizard-world/useHouses';
import { useScoreboardStore, type THouseScore } from '@/store/scoreboard';
import { computed, watch } from 'vue';
import { DataTable, Column, Button, useToast } from 'primevue';
import VisuallyHidden from '@/components/VisuallyHidden.vue';
import { useOverFlowToggle } from '@/composables/useOverFlowToggle';
import { useUserStore } from '@/store/user';
import Loader from '@/components/Loader.vue';

useOverFlowToggle();
const toast = useToast();
const userStore = useUserStore();
const scoreboardStore = useScoreboardStore();

const {isPending, data, isError, error} = useHousesQuery();
// Set selected house when data is being refetched
watch(isPending, (nextValue) => {
    // Still loading data
    if (nextValue) return;
    // data possibly fetched, check for errors
    if (isError.value) {
        toast.add({
            severity: 'error', 
            summary: 'Error', 
            detail: error.value?.message,
            life: 3000 
        });
    }
});

const houseScoreboard = computed(() => {
    if (!data.value) return [];
    return data.value.map((house) => {
        const houseName = house.name.toLowerCase()
        return {
            name: houseName,
            score: scoreboardStore.scores[houseName] || 0
        }
    });
});

function updateHouseScore(houseScoreData: THouseScore, type: 'increment' | 'decrement') {
    const dir = (type === 'increment') ? 1 : -1;
    const newHouseScore = houseScoreData.score + (1 * dir);
    scoreboardStore.updateHouseScore(houseScoreData.name, newHouseScore);
}
</script>

<style lang="scss" scoped>
.scoreboard-view__wrapper {
    margin-top: 32px;
}

.house-logo-name__wrapper {
    display: flex;
    align-items: center;
    gap: 12px;

    span {
        font-size: 1.15rem;
        text-transform: capitalize;
    }
}

.house-logo {
    width: 50px;
}

.score-operations-btn__wrapper {
    display: flex;
    gap: 12px;
}
</style>