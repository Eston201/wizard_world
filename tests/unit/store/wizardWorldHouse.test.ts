import { describe, beforeEach, it, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia'
import { useWizardWorldHouseStore } from '../../../src/store/wizardWorldHouse';
import { IHouse } from '../../../src/api/wizard-world/utils';
import slugify from 'slugify';

const dummyHouse: IHouse = {
    id: 'Test id',
    name: 'Test House Name',
    houseColours: 'blue and red',
    founder: 'Eston Naicker',
    animal: 'dog',
    element: 'dog',
    ghost: 'dog',
    commonRoom: 'dog',
    heads: [{id: "Me", firstName: "me", lastName: "me"}],
    traits: [{
      id: 'everything',
      name: 'everything'
    }],
    slug: slugify('Test House Name')
}

describe('Wizard World House Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  });

  it('can set a selected house correctly', () => {
    const houseStore = useWizardWorldHouseStore();
    houseStore.setSelectedHouse(dummyHouse);
    expect(houseStore.selectedHouse).toEqual(dummyHouse);
  });

  it('can return the selected house id', () => {
    const houseStore = useWizardWorldHouseStore();
    houseStore.setSelectedHouse(dummyHouse);
    expect(houseStore.selectedHouse).toEqual(dummyHouse);
    expect(houseStore.selectedHouseId).toEqual('Test id');
  });

  it('can clear selected house', () => {
    const houseStore = useWizardWorldHouseStore();
    houseStore.setSelectedHouse(dummyHouse);
    houseStore.clearSelectedHouse();
    expect(houseStore.selectedHouse).toBeUndefined();
  });
});