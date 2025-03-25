import { API_CONFIG } from "@/constants";
import catchAsync from "../../utils/catchAsync";
import type { IHouse } from "./types";
import ApiError from "@/utils/ApiError";
import slugify from "slugify";

const housesAPI = `${API_CONFIG.wizardWorld}/Houses`;

export const fetchHouses = catchAsync(async (): Promise<IHouse[]> => {
    const response = await fetch(housesAPI);
    const data: IHouse[] = await response.json();
    // Add slug
    return data.map((house) => ({
        ...house,
        slug: slugify(house.name, {lower: true})
    }));
});

export const fetchHouseWithId = catchAsync(async (id: string): Promise<IHouse> => {
    const response = await fetch(`${housesAPI}/${id}`);
    const data = await response.json();
    if (data.status === 400) {
        throw new ApiError('House not found!', 400);
    }
    else if (data.status === 404) {
        throw new ApiError(data.title, 404);
    }
    return data;
});