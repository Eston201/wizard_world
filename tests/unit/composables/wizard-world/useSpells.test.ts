import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useSpellsQuery } from '../../../../src/composables/wizard-world/useSpells';
import { ISpellSearchParams } from '../../../../src/api/wizard-world/utils';
import { useQuery } from '@tanstack/vue-query';
import { dummySpells } from '../../../common';
import { ref } from 'vue';

describe('Spell Queries', () => {
  beforeEach(() => {
    vi.mocked(useQuery).mockReset();
  });

  // Test for useHousesQuery
  describe('useSpellsQuery', () => {
    it('returns spells data when successful', async () => {
      vi.mocked(useQuery).mockReturnValue({
        data: ref(dummySpells),
        isPending: ref(false),
        isError: ref(false),
        isLoading: ref(false),
        isSuccess: ref(true),
        error: ref(null),
      } as any);

      const searchParams: ISpellSearchParams = {
        name: '',
        type: '',
        incantation: '',
      }

      const result = useSpellsQuery(searchParams);
      expect(result.data.value).toEqual(dummySpells);
      expect(result.isSuccess.value).toBe(true);
      expect(result.isPending.value).toBe(false);
    });

    it('be called with search params correctly', () => {
        vi.mocked(useQuery).mockReturnValue({
            data: ref([dummySpells[0]]),
            isPending: ref(false),
            isError: ref(false),
            isLoading: ref(false),
            isSuccess: ref(true),
            error: ref(null),
        } as any);

        const searchParams: ISpellSearchParams = {
            name: 'testing spell',
            type: '',
            incantation: '',
        }

        const result = useSpellsQuery(searchParams);
        expect(result.data.value).toEqual([dummySpells[0]]);
        expect(result.isSuccess.value).toBe(true);
        expect(result.isPending.value).toBe(false);

        const mockedCalls = vi.mocked(useQuery).mock.calls[0][0] as any;
        expect(mockedCalls.queryKey).toEqual(['wizardWorld', 'spells', searchParams]);
    });
  });
});