import { describe, beforeEach, it, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../../../src/store/user';

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  });

  it('can set a user correctly', () => {
    const userStore = useUserStore();
    userStore.setUser("Test Role", "Test UserName");
    expect(userStore.user).toEqual({role: "Test Role", username: "Test UserName"});
  });
});