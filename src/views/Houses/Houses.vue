<template>
    <main class="houses-view__wrapper">
        <Loader :is-loading="isPending">
            Fetching Houses
        </Loader>

        <div class="houses-view-content" v-if="!isPending">
            <section class="carousel__wrapper">
                <Carousel
                    :value="houses" 
                    :numVisible="4"
                    :numScroll="3"
                    :responsive-options="responsiveOptions"
                >
                    <template #item="{data: house}">
                        <MotionHouseBanner
                            :while-press="{scale: 0.9, y: -4}"
                            :transition="{type: 'spring', duration: 0.4, damping: 10}"
                            :house-name="house.name.toLowerCase()"
                            :active="houseStore.selectedHouseId === house.id"
                            @click="() => handleHouseClick(house)"
                        >
                            <div class="router-link__wrapper">
                                <router-link
                                    :to="{
                                        name: ROUTE_NAMES.HOUSE_DETAIL,
                                        params: {
                                            id: house.slug
                                        }
                                    }"
                                    @click="() => houseStore.setSelectedHouse(house)"
                                >
                                    {{ house.name }}
                                </router-link>
                            </div>
                        </MotionHouseBanner>
                    </template>
                </Carousel>

                <p v-show="!houseStore.selectedHouse">Select A House</p>
            </section>
    
            <section class="houses-child-route__wrapper">
                <router-view></router-view>
            </section>
        </div>
    </main>
</template>

<script lang="ts" setup>
import Carousel from 'primevue/carousel';
import HouseBanner from '@/components/Houses/HouseBanner.vue';
import Loader from '@/components/Loader.vue';
import { onBeforeUnmount, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useHousesQuery } from '@/composables/wizard-world/useHouses';
import { useWizardWorldHouseStore } from '@/store/wizardWorldHouse';
import { ROUTE_NAMES } from '@/router/types';
import type { IHouse } from '@/api/wizard-world/utils';
import { motion } from 'motion-v';

const MotionHouseBanner = motion.create(HouseBanner);

const router = useRouter();
const houseStore = useWizardWorldHouseStore();

const toast = useToast();
function showErrorToast(message: string) {
    toast.add({
        severity: 'error', 
        summary: 'Error', 
        detail: message,
        life: 3000 
    });
}

// VuePrime carousel options
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

const {data: houses, isPending, isError, error} = useHousesQuery();
// Set selected house when data is being refetched
watch(isPending, (nextValue) => {
    // Still loading data
    if (nextValue) return;
    // data possibly fetched, check for errors
    if (isError.value) {
        showErrorToast(error.value?.message!);
        return;
    }
    // We have data so check if we need to set the house store 
    // If there is a id on the route
    const houseSlug = router.currentRoute.value.params.id;
    if (!houseSlug) return;
    const house = houses.value?.find((house) => house.slug === houseSlug);
    if (!house) return showErrorToast(`House ${houseSlug} Not Found!`);
    houseStore.setSelectedHouse(house);
});

function handleHouseClick(house: IHouse) {
    houseStore.setSelectedHouse(house);
    router.push({
        name: ROUTE_NAMES.HOUSE_DETAIL,
        params: { id: house.slug}
    });
}

onBeforeUnmount(() => {
    houseStore.clearSelectedHouse();
});
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

    display: flex;
    flex-direction: column;
    gap: 12px;

    & > p {
        align-self: center;
        font-size: 1.25rem;
    }
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

.houses-child-route__wrapper {
    flex: 1;
}

.router-view-msg {
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.5rem;
}
</style>