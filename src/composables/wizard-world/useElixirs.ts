import { fetchElixirs } from "@/api/wizard-world/elixirs";
import type { IElixirSearchParams } from "@/api/wizard-world/utils";
import { useQuery } from "@tanstack/vue-query";
import { toValue, type MaybeRefOrGetter } from "vue";

export function useElixirsQuery(
    searchParams: MaybeRefOrGetter<IElixirSearchParams>
) {
    return useQuery({
        queryKey: ['wizardWorld', 'elixirs', searchParams],
        queryFn: () => fetchElixirs(toValue(searchParams)),
    });
}