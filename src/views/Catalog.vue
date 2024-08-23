<template>
  <div>
    <ModalComponent :isOpen="isModalOpen" :product="null" @close="closeModal" />
    <div class="catalog-container">
      <Preloader v-if="isLoading" />
      <div v-else class="products-list">
        <div
          class="product-item"
          v-for="product in store.products"
          :key="product.id"
          @click="showProductDetails(product.id)"
        >
          <div class="descriptions">
            <img loading="lazy" :src="product.thumbnail" alt="" />
            <div class="description">
              <h2 class="title">{{ product.brand }}</h2>
              <p class="price">R${{ product.price }}</p>
              <p class="product-description">{{ product.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { productsStore } from "@/stores/products";
import Preloader from "@/components/Preloader.vue";
import ModalComponent from "@/components/ModalComponent.vue";

type ProductId = number;

const isLoading = ref<boolean>(true);
const isModalOpen = ref<boolean>(false);
const store = productsStore();

const showProductDetails = async (id: ProductId): Promise<void> => {
  await store.getSelectProduct(id);
  isModalOpen.value = true;
};

const closeModal = (): void => {
  isModalOpen.value = false;
  store.selectedProduct = null;
};

watchEffect(() => {
  if (store.products.length > 0) {
    isLoading.value = false;
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
.catalog-container {
  overflow-y: auto;
  height: 100vh;
  padding: -1rem;
}
.products-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 5%;
  margin-top: 50px;
  border-radius: 10px;
}

.product-item {
  display: flex;
  padding: 16px;
  box-shadow: 0px 0px 14px 1px #615a5a;
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
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 15px;
  background-color: #f0f0f0;
  flex-shrink: 0;
}

.description {
  font-size: 15px;
  flex-grow: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

@media (max-width: 600px) {
  .products-list {
    grid-template-columns: 1fr;
  }
}
</style>
