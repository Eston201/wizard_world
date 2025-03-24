<template>
    <main class="houses-view__wrapper">
        <div v-if="isPending">
            Loading...
        </div>

        <div class="houses-view-content" v-else>
            <section class="carousel__wrapper">
                <Carousel
                    :value="data" 
                    :numVisible="4" 
                    :numScroll="3"
                    :responsive-options="responsiveOptions"
                >
                    <template #item="{data}">
                        <HouseBanner
                            :house-name="data.name.toLowerCase()"
                            :active="houseStore.selectedHouseId === data.id"
                            @click="() => handleHouseClick(data)"
                        >
                            <div class="router-link__wrapper">
                                <router-link
                                    :to="{
                                        name: ROUTE_NAMES.HOUSE_DETAIL,
                                        params: {
                                            id: data.id
                                        }
                                    }"
                                    @click="() => houseStore.setSelectedHouse(data)"
                                >
                                    {{ data.name }}
                                </router-link>
                            </div>
                        </HouseBanner>
                    </template>
                </Carousel>
            </section>
    
            <section class="house-child-route__wrapper">
                <router-view></router-view>
            </section>
        </div>
    </main>
</template>

<script lang="ts" setup>
import Carousel from 'primevue/carousel';
import HouseBanner from '@/components/Houses/HouseBanner.vue';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useHousesQuery } from '@/composables/wizard-world/useHouses';
import { useWizardWorldHouseStore } from '@/store/wizardWorldHouse';
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
        return;
    }
    // We have data so check if we need to set the house store 
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
.houses-view__wrapper {
    height: 100%;
    width: 100%;
}

.houses-view-content {
    height: 100%;

    display: flex;
    flex-direction: column;
    padding-bottom: 22px;
}

.carousel__wrapper {
    margin-top: 32px;
}

.router-link__wrapper {
    width: 100%;
    text-align: center;

    a {
        display: block;
        color: hsl(var(--text-color));
        font-size: 1.25rem;
        text-decoration: none;
    }
}

.house-child-route__wrapper {
    flex: 1;
}
</style>