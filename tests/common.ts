import { IHouse, ISpell } from "../src/api/wizard-world/utils";

export const dummyHouses: IHouse[] = [
    {
        id: 'test 1',
        name: "test 1",
        slug: 'test-1',
        houseColours: "black and white",
        founder: "test 1",
        animal: "test 1",
        element: "test 1",
        ghost: "test 1",
        commonRoom: "",
        heads: [],
        traits: []
    },
    {
        id: 'test 2',
        name: "test 2",
        slug: 'test-2',
        houseColours: "blue and red",
        founder: "test 2",
        animal: "test 2",
        element: "test 2",
        ghost: "test 2",
        commonRoom: "",
        heads: [],
        traits: []
    },
];

export const dummySpells: ISpell[] = [
    {
        id: "2123-32312-3123",
        name: "testing spell",
        incantation: "IDoTest",
        effect: "calls a test",
        canBeVerbal: false,
        type: "unit",
        light: "heavy",
        creator: "vitest"
    },
    {
        id: "2123-32312-3123",
        name: "vue spell",
        incantation: "vue",
        effect: "create a vue project",
        canBeVerbal: true,
        type: "component",
        light: "light",
        creator: "vitest"
    },
];