import { fetchSpells } from "@/api/wizard-world/spells";
import type { ISpellSearchParams } from "@/api/wizard-world/utils";
import { useQuery } from "@tanstack/vue-query";
import { toValue, type MaybeRefOrGetter } from "vue";

export function useSpellsQuery(searchParams: MaybeRefOrGetter<ISpellSearchParams>) {
    return useQuery({
        queryKey: ['wizardWorld', 'spells', searchParams],
        queryFn: () => fetchSpells(toValue(searchParams)),
    });
}