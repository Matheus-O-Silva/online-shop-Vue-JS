<template>
  <div>
    <ModalComponent
      :isOpen="isModalOpen"
      :product="selectedProduct"
      @close="closeModal"
    />
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
import ModalComponent from "@/components/ModalComponent.vue";

const isLoading = ref(true);
const isModalOpen = ref(false);
const store = productsStore();

const showProductDetails = (id) => {
  store.getSelectProduct(id); // Busca detalhes do produto
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  store.selectedProduct = null;
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
  grid-template-columns: repeat(2, 1fr); /* Exibe 2 produtos por linha */
  gap: 20px; /* Espaço entre os produtos */
  margin: 10%;
  margin-top: 50px;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
}

.product-item {
  display: flex; /* Usar Flexbox para alinhar a descrição e a imagem */
  padding: 16px;
  box-shadow: 0px 0px 14px 1px #e6e6e6;
  cursor: pointer;
  border-radius: 10px; /* Bordas arredondadas */
  background-color: #fff; /* Fundo branco */
}

.descriptions {
  display: flex; /* Flexbox para a descrição */
  align-items: center; /* Alinhamento vertical no centro */
}

.product-item img {
  width: 80px; /* Ajuste o tamanho da imagem */
  height: auto; /* Manter a proporção */
  border-radius: 8px; /* Bordas arredondadas na imagem */
  margin-right: 15px; /* Espaço entre a imagem e a descrição */
}

.description {
  font-size: 15px;
  flex-grow: 1; /* Para que a descrição ocupe o espaço restante */
}

.title {
  margin-top: 5px;
  font-size: 17px;
  font-weight: bold;
}

.price {
  margin-top: 5px;
  font-weight: bold; /* Deixar o preço em negrito */
}

.product-description {
  margin-top: 5px;
}

[v-cloak] {
  display: none;
}

/* Media Query para telas menores */
@media (max-width: 600px) {
  .products-list {
    grid-template-columns: 1fr; /* Exibe 1 produto por linha */
  }
}
</style>
