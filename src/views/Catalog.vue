<template>
  <div>
    <ModalComponent :isOpen="isModalOpen" :product="null" @close="closeModal" />
    <div class="catalog-container">
      <div class="products-list">
        <!-- Exibir o skeleton enquanto os produtos estão sendo carregados -->
        <template v-if="isLoading">
          <ProductSkeleton v-for="n in 8" :key="n" />
        </template>
        <template v-else>
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
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { productsStore } from "@/stores/products";
import ModalComponent from "@/components/ModalComponent.vue";
import ProductSkeleton from "@/components/ProductSkeleton.vue";

type ProductId = number;

const isModalOpen = ref<boolean>(false);
const isLoading = ref<boolean>(true); // Controle de estado de carregamento
const store = productsStore();

const showProductDetails = async (id: ProductId): Promise<void> => {
  await store.getSelectProduct(id);
  isModalOpen.value = true;
};

const closeModal = (): void => {
  isModalOpen.value = false;
  store.selectedProduct = null;
};

onMounted(async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await store.fetchProductsFromDB();
    isLoading.value = false;
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
  align-items: center;
  width: 100%;
  height: 160px;
}

.descriptions {
  display: flex;
  align-items: center;
  flex-grow: 1;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.title,
.price {
  margin: 0;
  font-weight: bold;
}

.product-description {
  margin-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 14px;
  color: #555;
}

@media (max-width: 600px) {
  .products-list {
    grid-template-columns: 1fr;
  }
}
</style>
