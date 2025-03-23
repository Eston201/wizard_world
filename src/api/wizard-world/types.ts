export interface IHouseHead {
    id: string;
    firstName: string;
    lastName: string;
}

export interface IHouseTrait {
    id: string;
    name: string;
}

export interface IHouse {
    id: string;
    name: string;
    houseColours: string;
    founder: string;
    animal: string;
    element: string;
    ghost: string;
    commonRoom: string;
    heads: IHouseHead[];
    traits: IHouseTrait[];
}