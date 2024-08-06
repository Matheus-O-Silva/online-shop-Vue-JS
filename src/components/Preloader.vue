<template>
  <div class="preloader">
    <div class="spinner"></div>
  </div>
</template>

<script setup>
import { productsStore } from "@/stores/products";
import { onMounted, watch } from "vue";

const store = productsStore();

// Observe as mudanças em store.selectedProduct e abra o modal quando os dados forem carregados
watch(
  () => store.selectedProduct,
  (newProduct) => {
    if (newProduct) {
      store.modal = true; // Abre o modal quando o produto é carregado
    }
  }
);
</script>

<style scoped>
.preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
.spinner {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #bb1111; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
