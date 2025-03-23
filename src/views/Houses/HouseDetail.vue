<template>
    <div>
        {{ id }}
        {{ houseStore.selectedHouse }}
        <!-- {{ data }} -->
        <!-- {{ isPending }} -->
    </div>
</template>

<script setup lang="ts">
import { useHouseByIdQuery } from '@/composables/wizard-world/useHouses';
import { useWizardWorldHouseStore } from '@/store/wizardWorldHouse';
import ApiError from '@/utils/ApiError';
import { useToast } from 'primevue';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const houseStore = useWizardWorldHouseStore();

const props = defineProps({
    id: {
        type: String,
        required: true
    },
});

const isH = computed(() =>  {
    if (houseStore.selectedHouse === undefined) return true;
    return false;
});

// const {data, isPending, isError, error} = useHouseByIdQuery(
//     isH,
//     () => props.id
// );

// watch(isPending, (nextValue) => {
//     if (!nextValue && isError.value) {
//         toast.add({ 
//             severity: 'error', 
//             summary: 'Error', 
//             detail: error.value?.message,
//             life: 3000 
//         });
//         return;
//     }
    
//     houseStore.setSelectedHouse(data.value!);
// });

onMounted(() => {

})
</script>

<style scoped>

</style>