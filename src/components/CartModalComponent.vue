<template>
  <div
    v-if="isOpen"
    class="modal fade show d-block"
    tabindex="-1"
    aria-labelledby="modalLabel"
    aria-modal="true"
    role="dialog"
    aria-hidden="false"
    @keydown.esc="closeModal"
    style="background-color: rgba(0, 0, 0, 0.5)"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <ul class="product-list">
            <li v-for="product in store.cart" :key="product.id" class="product-item">
              <img class="image-modal" :src="product.thumbnail" alt="" />
              <div class="product-details">
                <h2>{{ product.title }}</h2>
                <p class="price">Preço: R$ {{ product.price.toFixed(2) }}</p>
                <p>Quantidade: {{ product.quantity }}</p>
                <p class="total">
                  Total: R$ {{ (product.price * product.quantity).toFixed(2) }}
                </p>
              </div>
              <hr class="separator" />
              <!-- Linha de separação -->
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">
            Fechar
          </button>
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from "vue";
import { productsStore } from "@/stores/products";
import type { ProductInterface } from "@/types/ProductInterface";

const store = productsStore();
const emit = defineEmits<{
  (event: "close"): void;
}>();

const props = defineProps<{
  isOpen: boolean;
  product: ProductInterface | null;
}>();

watch(
  () => store.selectedProduct,
  (newProduct) => {
    if (newProduct) {
      // Aqui pode adicionar lógica se necessário
    }
  }
);
</script>

<style scoped>
.product-list {
  list-style-type: none;
  padding: 0;
}

.product-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px; /* Espaço entre os produtos */
  padding: 10px 0; /* Padding vertical */
}

.image-modal {
  width: 100px; /* Tamanho fixo para as imagens */
  height: auto;
  margin-right: 20px; /* Espaçamento entre imagem e detalhes */
  box-shadow: 0px 0px 14px 1px #2a2828; /* Sombra ao redor da imagem */
}

.product-details {
  flex-grow: 1; /* Permite que os detalhes ocupem o espaço restante */
}

.price,
.total {
  font-weight: bold; /* Destaque para preço e total */
}

.separator {
  border: none; /* Remove a borda */
  border-top: 1px solid #ccc; /* Linha de separação */
  margin: 10px 0; /* Margem acima e abaixo da linha */
}

.modal {
  transition: opacity 0.3s ease;
}
</style>
