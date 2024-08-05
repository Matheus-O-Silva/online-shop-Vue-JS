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

<script>
export default {
  name: "ModalComponent",
};
</script>

<script setup>
import { productsStore } from "@/stores/products";

const store = productsStore();

const closeModal = () => {
  store.modal = false;
};
</script>

<style scoped>
/* Adicione seus estilos personalizados para o modal aqui */
</style>
