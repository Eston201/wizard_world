/**
 * Util Functions
*/
export function buildErrorMessage(errorListObject: Record<string, string[]>) {
    return Object.keys(errorListObject)
                 .map((k) => `Invalid argument provided for ${k}`)
                 .join(',');
}

/**
 * Types 
*/
// House Types
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
    slug: string;
}

// Spell Types
export interface ISpell {
    id: string;
    name: string;
    incantation: string;
    effect: string;
    canBeVerbal: boolean;
    type: string;
    light: string;
    creator: string;
}

export type ISpellSearchParams = Partial<Pick<ISpell, 'name' | 'type' | 'incantation'>>