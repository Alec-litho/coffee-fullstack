import { defineStore } from "pinia";
import type { NuxtError } from "#app";

interface User {
  id: number;
  email: string;
  username?: string;
  accessToken: string;
  refreshToken?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  username?: string;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  }),

  actions: {
    initializeAuth() {
      const authCookie = useCookie("authToken");
      this.isAuthenticated = !!authCookie.value;
    },

    async registerUser(registerData: RegisterData) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch("http://localhost:3002/auth/register", {
          method: "POST",
          body: registerData,
        });

        this.user = response;
        this.isAuthenticated = true;
        this.setAuthCookies(response);
        return response;
      } catch (error) {
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async login(credentials: LoginCredentials) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await fetch("http://localhost:3002/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
        });

        this.user = response.data as User;
        this.isAuthenticated = true;
        this.setAuthCookies(response);
        return response;
      } catch (error) {
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      this.resetAuthState();
      this.clearAuthCookies();
    },

    setAuthCookies(user: User) {
      const authCookie = useCookie("authToken", {
        maxAge: 60 * 60 * 24,
        secure: true,
        sameSite: "strict",
      });
      authCookie.value = user.accessToken;
    },

    clearAuthCookies() {
      const authCookie = useCookie("authToken");
      authCookie.value = null;
    },

    getAuthHeaders() {
      return {
        Authorization: `Bearer ${this.user?.accessToken || ""}`,
      };
    },

    resetAuthState() {
      this.user = null;
      this.isAuthenticated = false;
    },

    handleError(error: NuxtError | string): string {
      if (typeof error === "string") return error;
      return error.message || "An unknown authentication error occurred";
    },
  },

  getters: {
    currentUser: (state) => state.user,
    authError: (state) => state.error,
    isAuthLoading: (state) => state.isLoading,
  },
});
