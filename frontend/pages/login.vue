<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

const email = ref("");
const password = ref("");
const error = ref(false);
const authStore = useAuthStore();
const type = ref("login");

const handleLogin = async () => {
  if (type.value === "login") {
    await authStore.login({ email: email.value, password: password.value });
  } else if (type.value === "register") {
    await authStore.register({ email: email.value, password: password.value });

  } else error.value = true;
  return navigateTo("/products");

};
const togglePage = () => {
  type.value = type.value === "register" ? "login" : "register";
};
</script>

<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="form">
      <h1>{{ type === "register" ? "Регистрация" : "Авторизация" }}</h1>
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>
      <div class="form-group">
        <label>Пароль</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">{{ type === "register" ? "Зарегестрироваться" : "Войти" }}</button>

      <div v-if="error" class="error-message">Неверные данные авторизации</div>
    </form>
    <button @click="togglePage" type="button">{{ type === "register" ? "Авторизация" : "Регистрация" }}</button>
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/vars";

.login-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .form-group {
      display: flex;
      flex-direction: column;
    }
    .error-message {
      color: #dc3545;
      margin-top: 1rem;
    }

    button {
      background: $primary-color;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
</style>
