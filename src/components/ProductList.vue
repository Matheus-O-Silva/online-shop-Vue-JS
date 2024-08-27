<template>
  <Suspense>
    <template #default>
      <div class="products-list">
        <ProductItem
          class="product-item"
          v-for="product in store.products"
          :key="product.id"
          @click="showProductDetails(product.id)"
        />
      </div>
    </template>
    <template #fallback>
      <ProductSkeleton />
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { productsStore } from "@/stores/products";
import ProductSkeleton from "@/components/ProductSkeleton.vue";
import ProductItem from "@/components/ProductItem.vue";

const store = productsStore();
const isLoading = ref(true);

const fetchProducts = async () => {
  try {
    await store.fetchProductsFromDB();
    isLoading.value = false;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

onMounted(fetchProducts);

const showProductDetails = async (id: number): Promise<void> => {
  await store.getSelectProduct(id);
};
</script>

<style scoped>
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
