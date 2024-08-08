<template>
  <NavbarComponent />
  <ModalComponent />
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { productsStore } from "./stores/products";

const store = productsStore();
const router = useRouter();
</script>

<script>
import NavbarComponent from "./components/NavbarComponent.vue";
import ModalComponent from "./components/ModalComponent.vue";

export default {
  name: "App",
  components: {
    NavbarComponent,
    ModalComponent,
  },
};
</script>

<style scoped>
.cart-items {
  text-align: end;
  padding: 16px;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
}
</style>
