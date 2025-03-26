<template>
    <section class="elixir-difficulty__wrapper">
        <div class="filters__wrapper">
            <div class="elixir-filter-group">
                <label for="elixir_name">Elixir Name</label>
                <InputText 
                    id="elixir_name" 
                    name="elixirName" 
                    type="text" 
                    v-model="elixirSearchParams.name"
                    placeholder="E.G Elixir of Life" 
                    fluid
                />
            </div>

            <div class="elixir-filter-group">
                <label for="elixir_ingredient">Ingredient</label>
                <InputText 
                    id="elixir_ingredient" 
                    name="elixirIngredient"
                    type="text" 
                    v-model="elixirSearchParams.ingredient"
                    placeholder="E.G Stewed Mandrake"
                    fluid
                />
            </div>

            <div class="elixir-filter-group">
                <label for="elixir_inventor">Inventor</label>
                <InputText 
                    id="elixir_incantation" 
                    name="elixirIncantation"
                    type="text" 
                    v-model="elixirSearchParams.inventor"
                    placeholder="E.G Avada Kedavra"
                    fluid
                />
            </div>

            <div class="elixir-filter-group">
                <label for="elixir_manufacturer">Manufacturer</label>
                <InputText 
                    id="elixir_manufacturer" 
                    name="elixirManufacturer"
                    type="text" 
                    v-model="elixirSearchParams.manufacturer"
                    placeholder="E.G Avada Kedavra"
                    fluid
                />
            </div>
        </div>

        <div v-if="isPending" class="loading__wrapper">
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
            <span>Fetching Spells</span>
        </div>

        <div class="elixir-details-list" v-else>
            <ElixirCard 
                v-for="elixir of data" 
                :key="elixir.id" 
                :elixir="elixir"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import type { IElixirSearchParams } from '@/api/wizard-world/utils';
import { useElixirsQuery } from '@/composables/wizard-world/useElixirs';
import { watch } from 'vue';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { InputText, useToast } from 'primevue';
import { motion } from 'motion-v';
import ElixirCard from '@/components/Elixirs/ElixirCard.vue';
import Ripple from '@/components/Decorative/Ripple.vue';
import SortingHatIcon from '@/components/Icons/SortingHatIcon.vue';

const MotionSortingHatIcon = motion.create(SortingHatIcon);

const route = useRoute();
const toast = useToast();

const elixirSearchParams = reactive<IElixirSearchParams>({
    name: '',
    difficulty: '',
    ingredient: '',
    inventor: '',
    manufacturer: ''
});

watch(
    () => route.params.difficulty,
    (v) => {
        elixirSearchParams.difficulty = v as string
    },
    {immediate: true}
);

const {isPending, data, isError, error} = useElixirsQuery(elixirSearchParams);

// Watch for errors when loading and show a toast if error
watch(isPending, (nextValue) => {
    if (nextValue) return;

    if (isError.value) {
        toast.add({
            severity: 'error', 
            summary: 'Error', 
            detail: error.value?.message || 'Unable to fetch spells!',
            life: 3000
        });
    }
});
</script>

<style lang="scss" scoped>
.elixir-difficulty__wrapper {
    display: flex;
    flex-direction: column;
    gap: 32px;

    padding-top: 22px;
}

.filters__wrapper {
    display: flex;
    justify-content: center;
    gap: 12px;

    @include mobileAndBelow() {
        flex-wrap: wrap;
        justify-content: revert;
    }
}

.elixir-filter-group {
    display: flex;
    flex-direction: column;
    gap: 6px;

    label {
        margin-left: 2px;
    }
}

.loading__wrapper {
    height: 100%;

    display: flex;  
    flex-direction: column;
    align-items: center;
    justify-content: center; 
}
</style>