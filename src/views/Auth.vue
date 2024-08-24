<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-sm" id="main-card" style="width: 400px">
      <h3 class="card-title text-center">Login</h3>
      <form @submit.prevent="login">
        <Alert
          ><template v-slot:alert>
            <p>{{ errorMsg }}</p>
          </template></Alert
        >
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
import Alert from "../components/Alert.vue";
import { useRouter } from "vue-router";
import AuthuseStore from "@/stores/auth";

const router = useRouter();
const email = ref<string>("");
const password = ref<string>("");
let errorMsg = ref<string>("");
const authStore = AuthuseStore();

const login = async () => {
  try {
    //debugger;
    await authStore
      .auth(email.value, password.value)
      .then(() => {
        router.push({
          name: "Catalog",
        });
      })
      .catch((err) => {
        errorMsg.value = err.response.data.message;
      });
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
#main-card {
  display: flex;
  margin-top: -3%;
}
</style>
