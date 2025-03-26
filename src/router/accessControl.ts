import type { RouteLocationNormalizedGeneric } from "vue-router";
import { ROUTE_NAMES } from "./types";
import { indexBy } from "ramda";
import { ROLE, type TRole } from "@/store/user";
import { HeadmasterRestrictedElixirDifficulties } from "@/api/wizard-world/utils";

export function checkAccessPermission(
    route: RouteLocationNormalizedGeneric, 
    _from: RouteLocationNormalizedGeneric,
    role: TRole | undefined
) {
    // No role by checking access, so return false
    if (!role) return {hasPermission: false, redirectPathName: ROUTE_NAMES.HOME};
    
    const routesMatchedByName = indexBy((r) => (r.name as string), route.matched);

    // Restrict Certain Elixir Difficulties
    if (ROUTE_NAMES.ELIXIR_DIFFICULTY in routesMatchedByName) {        
        if (
            role !== ROLE.HEADMASTER && 
            HeadmasterRestrictedElixirDifficulties.includes(route.params.difficulty as string)
        ) {
            return {hasPermission: false, redirectPathName: ROUTE_NAMES.ELIXIRS}
        }
    }

    // default to true
    return {hasPermission: true};
}