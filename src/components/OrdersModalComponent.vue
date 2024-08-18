<template>
  <div
    v-if="isOrdersModalOpen"
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
          <h5 class="modal-title">Pedidos</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="$emit('close')"
          ></button>
        </div>
        <div class="modal-body"></div>
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
import { ref, watch, defineEmits, computed } from "vue";
import { productsStore } from "@/stores/products";
import Swal from "sweetalert2";
import type { ProductInterface } from "@/types/ProductInterface";

const props = defineProps<{
  isOrdersModalOpen: boolean;
}>();

const store = productsStore();

const emit = defineEmits<{
  (event: "close"): void;
}>();
</script>

<style scoped>
.modal-title {
  font-size: 30px;
}
.product-list {
  list-style-type: none;
  padding: 0;
}

.product-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px 0;
}

.image-modal {
  width: 100px;
  height: auto;
  margin-right: 20px;
  box-shadow: 0px 0px 14px 1px #5a5555;
}

.product-details {
  flex-grow: 1;
}

.price,
.total {
  font-weight: bold;
}

.separator {
  border: none;
  border-top: 1px solid #ccc;
  margin: 10px 0;
}

.modal {
  transition: opacity 0.3s ease;
}

.totalPriceCart {
  height: 5%;
  justify-content: center;
  display: flex;
  margin-top: 2%;
  margin-bottom: 10px;
  font-size: 20px;
}
</style>
