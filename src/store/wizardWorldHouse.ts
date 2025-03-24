import type { IHouse } from "@/api/wizard-world/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useWizardWorldHouseStore = defineStore('wizardWorldHouse', () => {
    const selectedHouse = ref<IHouse | undefined>(undefined);

    const selectedHouseId = computed(() => selectedHouse.value?.id);
    function setSelectedHouse(house: IHouse) {
        selectedHouse.value = house;
    }
    function clearSelectedHouse() {
        selectedHouse.value = undefined;
    }
    

    return {
        selectedHouse,
        selectedHouseId,
        setSelectedHouse,
        clearSelectedHouse
    }
});