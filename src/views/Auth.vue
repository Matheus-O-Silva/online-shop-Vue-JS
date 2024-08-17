<template>
  <div>
    <Preloader v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { productsStore } from "@/stores/products";

const isLoading = ref<boolean>(true);
const isModalOpen = ref<boolean>(false);
</script>

<style scoped>
.products-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 10%;
  margin-top: 50px;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
}

.product-item {
  display: flex;
  padding: 16px;
  box-shadow: 0px 0px 14px 1px #e6e6e6;
  cursor: pointer;
  border-radius: 10px;
  background-color: #fff;
}

.descriptions {
  display: flex;
  align-items: center;
}

.product-item img {
  width: 80px;
  height: auto;
  border-radius: 8px;
  margin-right: 15px;
}

.description {
  font-size: 15px;
  flex-grow: 1;
}

.title {
  margin-top: 5px;
  font-size: 17px;
  font-weight: bold;
}

.price {
  margin-top: 5px;
  font-weight: bold;
}

.product-description {
  margin-top: 5px;
}

@media (max-width: 600px) {
  .products-list {
    grid-template-columns: 1fr;
  }
}
</style>
