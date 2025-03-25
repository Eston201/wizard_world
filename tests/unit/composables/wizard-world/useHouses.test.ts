import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useHouseByIdQuery, useHousesQuery } from '../../../../src/composables/wizard-world/useHouses';
import { useQuery } from '@tanstack/vue-query';

describe('House Queries', () => {
  beforeEach(() => {
    vi.mocked(useQuery).mockReset();
  });

  // Test for useHousesQuery
  describe('useHousesQuery', () => {
    it('returns houses data when successful', async () => {
      const mockHouses = [
        { id: '1', name: 'Gryffindor' },
        { id: '2', name: 'Slytherin' },
      ];

      vi.mocked(useQuery).mockReturnValue({
        data: mockHouses,
        isPending: false,
        isError: false,
        isLoading: false,
        isSuccess: true,
        error: null,
      } as any);

      const result = useHousesQuery();
      expect(result.data).toEqual(mockHouses);
      expect(result.isSuccess).toBe(true);
      expect(result.isPending).toBe(false);
    });

    it('handles loading state', async () => {
      vi.mocked(useQuery).mockReturnValue({
        data: undefined,
        isPending: true,
        isError: false,
        isLoading: true,
        isSuccess: false,
        error: null,
      } as any);

      const result = useHousesQuery();
      expect(result.isPending).toBe(true);
      expect(result.isLoading).toBe(true);
      expect(result.data).toBeUndefined();
    });
  });

  // Test for useHouseByIdQuery
  describe('useHouseByIdQuery', () => {
    it('returns house data when enabled and successful', async () => {
      const mockHouse = { id: '1', name: 'Gryffindor' };

      vi.mocked(useQuery).mockReturnValue({
        data: mockHouse,
        isPending: false,
        isError: false,
        isLoading: false,
        isSuccess: true,
        error: null,
      } as any);

      const result = useHouseByIdQuery(true, '1');
      expect(result.data).toEqual(mockHouse);
      expect(result.isSuccess).toBe(true);

      const mockedCalls = vi.mocked(useQuery).mock.calls[0][0] as any;
      expect(mockedCalls.enabled).toBe(true);
      expect(mockedCalls.queryKey).toEqual(['wizardWorld', 'houses', '1']);
    });

    it('does not fetch when disabled', async () => {
      vi.mocked(useQuery).mockReturnValue({
        data: undefined,
        isPending: false,
        isError: false,
        isLoading: false,
        isSuccess: false,
        error: null,
      } as any);

      const result = useHouseByIdQuery(false, '1');
      expect(result.data).toBeUndefined();
      const mockedCalls = vi.mocked(useQuery).mock.calls[0][0] as any;
      expect(mockedCalls.enabled).toBe(false);
    });
  });
});