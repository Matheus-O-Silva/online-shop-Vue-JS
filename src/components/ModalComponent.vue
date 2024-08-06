<template>
  <div
    v-if="store.modal"
    class="modal fade show d-block"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-modal="true"
    role="dialog"
    style="background-color: rgba(0, 0, 0, 0.5)"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLabel">
            <slot name="title">{{ store.selectedProduct?.brand }}</slot>
          </h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body">
          <div class="product-image">
            <img class="image-modal" :src="store.selectedProduct?.thumbnail" alt="" />
          </div>
          <p>{{ store.selectedProduct?.description }}</p>
          <p><strong>Preço:</strong> R${{ store.selectedProduct?.price }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Fechar
          </button>
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { productsStore } from "@/stores/products";
import { onMounted, watch } from "vue";

const store = productsStore();

// Observe as mudanças em store.selectedProduct e abra o modal quando os dados forem carregados
watch(
  () => store.selectedProduct,
  (newProduct) => {
    if (newProduct) {
      store.modal = true; // Abre o modal quando o produto é carregado
    }
  }
);

// Carrega os dados do produto quando o modal é montado
onMounted(() => {
  // Aqui, o ID do produto pode ser passado como uma prop ou recuperado de outra forma
  // Exemplo: getSelectProduct(productId);
});

const closeModal = () => {
  store.selectedProduct = null;
  store.modal = false;
};
</script>

<style scoped>
.product-image {
  box-shadow: 0px 0px 14px 1 px #e6e6e6;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-bottom: 2%;
}

.image-modal {
  width: 50%;
  height: 50%;
}
</style>
