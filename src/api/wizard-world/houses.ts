import { API_CONFIG } from "@/constants";
import type { IHouse } from "./utils";
import ApiError from "@/utils/ApiError";
import slugify from "slugify";
import request from '@/utils/request';

const housesAPI = `${API_CONFIG.wizardWorld}/Houses`;

export const fetchHouses = async (): Promise<IHouse[]> => {
    const response = await request("GET", housesAPI);
    if (response.error) throw new Error("Someting went wrong!");
    // Add slug and return
    return (response as IHouse[]).map((house) => ({
        ...house,
        slug: slugify(house.name, {lower: true})
    }));
};

export const fetchHouseWithId = async (id: string): Promise<IHouse> => {
    const response = await request("GET", `${housesAPI}/${id}`);

    if (response.error) {
        if (!response.data) throw new Error('Something went wrong!');
        // Api Error
        const errorData = response.data;
        if (errorData.status === 404) throw new ApiError(errorData.title, 404);
        else throw new ApiError('House not found!', 400);
    }

    // Add slug and return
    return {
        ...response,
        slug: slugify(response.name)
    };
};