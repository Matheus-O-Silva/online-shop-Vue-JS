<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-sm" id="main-card" style="width: 400px">
      <h3 class="card-title text-center">Registrar</h3>
      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label for="name" class="form-label">Nome</label>
          <input type="text" class="form-control" id="name" v-model="name" required />
        </div>
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
        <div class="mb-3">
          <label for="confirm-password" class="form-label">Confirme a Senha</label>
          <input
            type="password"
            class="form-control"
            id="confirm-password"
            v-model="confirmPassword"
            required
          />
        </div>
        <div class="d-grid">
          <button type="submit" class="btn btn-danger">Registrar</button>
        </div>
      </form>
      <div class="text-center mt-3">
        <router-link :to="{ name: 'Auth' }">Já tem uma conta? Entrar</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const name = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const confirmPassword = ref<string>("");

const handleRegister = () => {
  if (password.value !== confirmPassword.value) {
    alert("As senhas não coincidem!");
    return;
  }

  router.push({ name: "Auth" });
};
</script>

<style scoped>
html,
body {
  overflow: hidden;
  height: 100%;
  margin: 0;
}

.card-title {
  font-weight: bold;
}

.form-label {
  font-weight: 500;
}

#main-card {
  margin-top: -3%;
}
</style>
