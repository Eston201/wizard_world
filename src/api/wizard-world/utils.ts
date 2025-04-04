/**
 * Util Functions
*/

// Build error message based on the error object that's
// brought back by the wizard world api
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

export interface IIngredient {
    id: string,
    name: string
}

export interface IInventor {
    id: string,
    firstName: string,
    lastName: string
}

// Elixirs
export interface IElixir {
    id: string,
    name: string,
    effect: string,
    sideEffects: string,
    characteristics: string,
    time: string,
    difficulty: string,
    ingredients: IIngredient[],
    inventors: IInventor[],
    manufacturer: string
}

export type IElixirSearchParams = {
    name: string;
    difficulty: string;
    ingredient: string;
    InventorFullName: string;
    manufacturer: string;
}

export const ElixirDifficulties = {
    'Unknown': 'Unknown',
    'Advanced': 'Advanced',
    'Moderate': 'Moderate',
    'Beginner': 'Beginner',
    'OrdinaryWizardingLevel': 'OrdinaryWizardingLevel',
    'OneOfAKind': 'OneOfAKind',
} as const;

export type TElixirDifficulty = typeof ElixirDifficulties[keyof typeof ElixirDifficulties];

export const HeadmasterRestrictedElixirDifficulties: string[] = [
    ElixirDifficulties.Advanced,
    ElixirDifficulties.OneOfAKind
];