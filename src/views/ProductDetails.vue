<template>
  <button @click="router.push({ name: 'Catalog' })">Back to Catalog</button>
  <div class="product">
    <div class="product-image">
      <img :src="selectedProduct.thumbnail" alt="" />
    </div>
    <div class="product-details">
      <p>Brand: {{ selectedProduct.band }}</p>
      <p>Description: {{ selectedProduct.description }}</p>
      <h2>Price: ${{ selectedProduct.price }}</h2>
    </div>
    <button @click="addToCart()">Add to Cart</button>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductDetails",
});
</script>

<script setup>
import { computed } from "vue";
import { productsStore } from "@/stores/products";
import { useRouter, useRoute } from "vue-router";

const addToCart = () => {
  store.addToCart(selectedProduct.value);
};

const store = productsStore();
const router = useRouter();
const route = useRoute();

const selectedProduct = computed(() => {
  return store.products.find((item) => item.id === Number(route.params.id));
});
</script>
