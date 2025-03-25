import { describe, beforeEach, it, expect } from 'vitest';
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore, HEADMASTER_AUTH, EXPLORER_AUTH } from '../../../src/store/auth';
import { useUserStore } from '../../../src/store/user';

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  });

  it('returns true when logging in with correct creds', () => {
    const authStore = useAuthStore();
    
    expect(authStore.isAuthenticated).toEqual(false);
    const result = authStore.login(HEADMASTER_AUTH, HEADMASTER_AUTH);
    expect(result).toBe(true);
    expect(authStore.isAuthenticated).toEqual(true);
  });

  it('sets the user in user store correctly after loggin in', () => {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    
    expect(authStore.isAuthenticated).toEqual(false);
    const result = authStore.login(EXPLORER_AUTH, EXPLORER_AUTH);
    expect(result).toBe(true);
    expect(authStore.isAuthenticated).toEqual(true);
    expect(userStore.user).toEqual({role: EXPLORER_AUTH, username: EXPLORER_AUTH});
  });

  it('returns true when logging in with incorrect creds', () => {
    const authStore = useAuthStore();
    const result = authStore.login('Not Valid', 'Not Valid');
    expect(result).toBe(false);
    expect(authStore.isAuthenticated).toEqual(false);
  });

  it('does not set the user store after invalid login', () => {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    
    expect(authStore.isAuthenticated).toEqual(false);
    const result = authStore.login(EXPLORER_AUTH, "Invalid password");
    expect(result).toBe(false);
    expect(authStore.isAuthenticated).toEqual(false);
    expect(userStore.user).toEqual({role: '', username: ''});
  });
});