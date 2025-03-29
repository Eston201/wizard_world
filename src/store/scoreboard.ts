import { defineStore } from "pinia";
import { reactive } from "vue";
import { useUserStore } from "./user";

export type THouseScore = {
    name: string,
    score: number,
}

export const useScoreboardStore = defineStore('scoreboard', () => {
    const scores: Record<string, number> = reactive({});

    function updateHouseScore(houseName: string, value: number) {
        const userStore = useUserStore();
        // Only headmaster can update house scores
        if (!userStore.isHeadMaster) return;
        scores[houseName] = value;
    }

    return {
        scores,
        updateHouseScore
    }
});