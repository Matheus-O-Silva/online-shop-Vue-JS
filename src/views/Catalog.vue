<template>
  <div class="products-list">
    <div
      class="product-item"
      v-for="product in store.products"
      :key="product.id"
      @click="goToProductPage(product.id)"
    >
      <div class="descriptions">
        <img :src="product.thumbnail" alt="" />
        <div class="description">
          <h2>Brand: {{ product.brand }}</h2>
          <p>Description: {{ product.description }}</p>
          <p>Price: ${{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="products-list">
    <div
      class="product-item"
      v-for="product in store.products"
      :key="product.id"
      @click="goToProductPage(product.id)"
    >
      <img :src="product.thumbnail" alt="" />
      <h2>Brand: {{ product.brand }}</h2>
      <p>Description: {{ product.description }}</p>
      <p>Price: ${{ product.price }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CatalogView",
});
</script>

<script setup>
import { onMounted } from "vue";
import { productsStore } from "@/stores/products";
import { useRouter } from "vue-router";

const store = productsStore();
const router = useRouter();

const goToProductPage = (id) => {
  router.push({ name: "ProductView", params: { id } });
};

onMounted(() => {
  store.fetchProductsFromDB();
});

onMounted(() => {});
</script>

<style scoped>
.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50%, 2fr));
  padding: 10px;
  margin: 1%;
  margin-top: 1%;
  border: 3px solid red;
  border-radius: 10px;
}

.product-item {
  flex-basis: 28%;
  margin: 8px;
  padding: 16px;
  box-shadow: 0px 0px 14px 1 px #e6e6e6;
  cursor: pointer;
  padding: 5%;
}

.product.item {
  border: 1px solid red;
  border-radius: 10px;
}

.product-item img {
  width: 70%;
  border: 1px solid red;
}

.description {
  border: 1px solid red;
  border-radius: 10px;
}

.descriptions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50%, 2fr));
  /*border: 1px solid green;
  border-radius: 10px;*/
  padding: 1%;
}
</style>
