import { defineStore } from "pinia";
import type { NuxtError } from "#app";

interface User {
  id: number;
  email: string;
  accessToken: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    error: null,
  }),

  actions: {
    initializeAuth() {
      const authCookie = useCookie("authToken");
      this.isAuthenticated = !!authCookie.value;
    },

    async register(registerData: RegisterData) {
      this.error = null;
      try {
        const response = await fetch("http://localhost:3002/auth/register", {
          method: "POST",
          body: JSON.stringify(registerData),
          headers: {
            "Content-type": "application/json"
          }
        });
        const user = await response.json()
        this.user = user;
        this.isAuthenticated = true;
        this.setAuthCookies(user);
        return user;
      } catch (error) {
        throw error;
      } 
    },

    async login(credentials: LoginCredentials) {
      this.error = null;
      try {
        const response = await fetch("http://localhost:3002/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-type": "application/json"
          }
        });
        const user = await response.json()
        this.user = user;
        this.isAuthenticated = true;
        this.setAuthCookies(user);
        return user;
      } catch (error) {
        throw error;
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
  },
});
