import { API_CONFIG } from "@/constants";
import { 
    buildErrorMessage, 
    type IElixir,
    type IElixirSearchParams, 
} from "./utils";
import ApiError from "@/utils/ApiError";
import request from "@/utils/request";

const elixirAPI = `${API_CONFIG.wizardWorld}/Elixirs`;

export const fetchElixirs = async (searchParams: IElixirSearchParams): Promise<IElixir[]> => {
    const response = await request("GET", elixirAPI, searchParams);
    // Check for api Errors
    if (response.error && response.status === 400) {
        const errorListObject = response.data.errors;
        throw new ApiError(buildErrorMessage(errorListObject), 400);
    }
    return response;
};