<template>
  <div>
    <Preloader v-if="isLoading" />

    <div v-else class="products-list">
      <div
        class="product-item"
        v-for="product in store.products"
        :key="product.id"
        @click="showProductDetails(product.id)"
      >
        <div class="descriptions">
          <img :src="product.thumbnail" alt="" />
          <div class="description">
            <h2 class="title">{{ product.brand }}</h2>
            <p class="price">R${{ product.price }}</p>
            <p class="product-description">{{ product.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from "vue";
import { productsStore } from "@/stores/products";
import Preloader from "@/components/Preloader.vue";

const isLoading = ref(true);
const store = productsStore();

const showProductDetails = (id) => {
  store.getSelectProduct(id); // Busca detalhes do produto
};

watchEffect(() => {
  if (store.products.length > 0) {
    isLoading.value = false; // Define isLoading como false quando produtos estiverem carregados
  }
});

onMounted(async () => {
  try {
    await store.fetchProductsFromDB();
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
});
</script>

<style scoped>
.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50%, 2fr));
  padding: 5px;
  margin: 10%;
  margin-top: 50px;
  width: 80%;
  height: 80%;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
}

.product-item {
  flex-basis: 28%;
  margin-left: -20px;
  padding: 16px;
  box-shadow: 0px 0px 14px 1 px #e6e6e6;
  cursor: pointer;
  padding: 5%;
}

.product.item {
  border: 1px solid rgb(255, 0, 0);
  border-radius: 10px;
}

.product-item img {
  width: 70%;
  border-radius: 10px;
}

.description {
  font-size: 15px;
  margin-left: -50px;
  width: 120%;
  height: 80%;
}

.descriptions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50%, 2fr));
  padding: 1%;
}

.title {
  margin-top: 5px;
  font-size: 17px;
  font-weight: bold;
}

.price {
  margin-top: 5px;
}

.product-description {
  margin-top: 5px;
}

[v-cloak] {
  display: none;
}
</style>
