import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore('user', () => {
    const overFlowHidden = ref(false);

    function toggleOverFlowOn() {
        overFlowHidden.value = true;
    }

    function toggleOverFlowOff() {
        overFlowHidden.value = false;
    }

    return {
        overFlowHidden,
        toggleOverFlowOn,
        toggleOverFlowOff,
    }
});