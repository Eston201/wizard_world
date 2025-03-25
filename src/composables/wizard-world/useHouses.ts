import { fetchHouses, fetchHouseWithId } from "@/api/wizard-world/houses";
import { useQuery } from "@tanstack/vue-query";
import { toValue, type MaybeRefOrGetter, type Ref } from "vue";

export function useHousesQuery() {
    return useQuery({
        queryKey: ['wizardWorld', 'houses'],
        queryFn: fetchHouses,
    });
}

export function useHouseByIdQuery(isEnabled: MaybeRefOrGetter<boolean>, houseId: MaybeRefOrGetter<string>) {
    return useQuery({
        enabled: isEnabled,
        queryKey: ['wizardWorld', 'houses', houseId],
        queryFn: () => fetchHouseWithId(toValue(houseId)),
    });
}