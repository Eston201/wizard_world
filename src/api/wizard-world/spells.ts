import { API_CONFIG } from "@/constants";
import { buildErrorMessage, type ISpell, type ISpellSearchParams } from "./utils";
import ApiError from "@/utils/ApiError";
import request from "@/utils/request";

const spellsAPI = `${API_CONFIG.wizardWorld}/Spells`;

export const fetchSpells = async (searchParams: ISpellSearchParams): Promise<ISpell[]> => {
    const response = await request("GET", spellsAPI, searchParams);
    // Check for api Errors
    if (response.error && response.status === 400) {
        const errorListObject = response.data.errors;
        throw new ApiError(buildErrorMessage(errorListObject), 400);
    }
    return response;
};