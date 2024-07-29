<template>
  <Preloader v-if="isLoading" />
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-sm" id="main-card" style="width: 400px">
      <h3 class="card-title text-center">Login</h3>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" v-model="email" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Senha</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            required
          />
        </div>
        <div class="d-grid">
          <button type="submit" class="btn btn-danger">Entrar</button>
        </div>
      </form>
      <div class="text-center mt-3">
        <a href="#">Esqueceu sua senha?</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { productsStore } from "@/stores/products";

const isLoading = ref<boolean>(true);
const isModalOpen = ref<boolean>(false);
</script>

<style scoped>
#main-card {
  display: flex;
  margin-top: -3%;
}
</style>
