import { useAppStore } from "@/store/app";
import { onMounted, onUnmounted } from "vue";

export function useOverFlowToggle() {
    const appStore = useAppStore();

    onMounted(() => {
        appStore.toggleOverFlowOn();
    });

    onUnmounted(() => {
        appStore.toggleOverFlowOff();
    });
}