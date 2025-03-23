<template>
    <main>
        <div v-if="isPending">
            Loading...
        </div>

        <Carousel
            v-else
            :value="data" 
            :numVisible="4" 
            :numScroll="3"
            :responsive-options="responsiveOptions"
        >
            <template #item="slotProps">
                <article class="house-card">
                    <div class="house-img__wrapper">
                        <img :src="`/images/houses/${slotProps.data.name}.png`" :alt="slotProps.data.name + 'logo'" />
                    </div>

                    <div class="router-link__wrapper">
                        <router-link
                            :to="{
                                name: ROUTE_NAMES.HOUSE_DETAIL,
                                params: {
                                    id: slotProps.data.id
                                }
                            }"
                        >
                            {{ slotProps.data.name }}
                        </router-link>
                        <!-- <button @click="() => handleHouseClick(slotProps.data)">
                            {{  slotProps.data.name }}
                        </button> -->
                    </div>
                </article>
            </template>
        </Carousel>

        <!-- <article 
            v-for="house of data" :style="{background: 'blue', margin: '10px'}"
            :key="house.id"
            @click="() => handleHouseClick(house)"
        >
            {{ house.name }}

            <div class="img__wrapper">
                <img :src="`/images/houses/${house.name}1.png`" alt="">
            </div>
        </article> -->

        <router-view></router-view>
    </main>
</template>

<script lang="ts" setup>
import { useHousesQuery } from '@/composables/wizard-world/useHouses';
import { useWizardWorldHouseStore } from '@/store/wizardWorldHouse';
import { useToast } from 'primevue/usetoast';
import Carousel from 'primevue/carousel';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from '@/router/types';
import type { IHouse } from '@/api/wizard-world/types';

const toast = useToast();
const router = useRouter();
const houseStore = useWizardWorldHouseStore();

const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);

const {data, isPending, isError, error} = useHousesQuery();

watch(isPending, (nextValue) => {
    // Still loading data
    if (nextValue) return;

    // data possibly fetched
    if (isError.value) {
        toast.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: error.value?.message,
            life: 3000 
        });
        return;
    }

    // We have data so check if we need to set house store 
    // If there is a id on the route
    const houseId = router.currentRoute.value.params.id;
    if (!houseId) return;
    const house = data.value?.find((house) => house.id === houseId);
    if (!house) return;
    houseStore.setSelectedHouse(house);
});


function handleHouseClick(house: IHouse) {
    houseStore.setSelectedHouse(house);
    router.push({
        name: ROUTE_NAMES.HOUSE_DETAIL,
        params: { id: house.id}
    });
}
</script>

<style lang="scss" scoped>
.house-card {
    height: 100%;
    width: 125px;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;

    .house-img__wrapper {
        flex: 1;

        img {
            height: 100%;
            object-fit: cover;
        }
    }

    .router-link__wrapper {
        width: 100%;
        text-align: center;
        
        a {
            color: hsl(var(--text-color));
            font-family: var(--harry-p);
            text-decoration: none;
        }
    }
}
</style>