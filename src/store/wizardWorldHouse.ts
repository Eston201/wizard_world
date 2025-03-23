import type { IHouse } from "@/api/wizard-world/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useWizardWorldHouseStore = defineStore('wizardWorldHouse', () => {
    const selectedHouse = ref<IHouse | undefined>(undefined);

    function setSelectedHouse(house: IHouse) {
        selectedHouse.value = house;
    }

    function clearSelectedHouse() {
        selectedHouse.value = undefined;
    }

    return {
        selectedHouse,
        setSelectedHouse,
        clearSelectedHouse
    }
});