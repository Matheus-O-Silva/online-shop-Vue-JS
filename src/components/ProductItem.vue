<template>
  <div class="product-item" @click="$emit('click')">
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

<script setup lang="ts">
import { defineProps } from "vue";

interface Product {
  id: number;
  thumbnail: string;
  brand: string;
  price: number;
  description: string;
}

const props = defineProps<{
  product: Product;
}>();
</script>

<style scoped>
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
</style>
