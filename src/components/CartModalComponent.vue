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
          <h5 class="modal-title">
            <slot class="titleModal" name="title"></slot>
          </h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <ul class="product-list">
            <div v-if="!store.cart.length" style="text-align: center">
              <h1>Carinho Vazio</h1>
            </div>
            <li v-for="product in store.cart" :key="product.id" class="product-item">
              <img class="image-modal" :src="product.thumbnail" alt="" />
              <div class="product-details">
                <h2>{{ product.title }}</h2>
                <p class="price">Preço: R${{ product.price.toFixed(2) }}</p>
                <p>Quantidade: {{ product.quantity }}</p>
                <p class="total">Total: R${{ product.totalPrice.toFixed(2) }}</p>
              </div>
              <button @click="removefromCart(product.id)" class="btn btn-danger">
                Remover
              </button>
              <hr class="separator" />
            </li>
          </ul>
        </div>
        <div v-if="totalPriceCart > 0" class="totalPriceCart">
          <b>Total do Carrinho: R${{ totalPriceCart }}</b>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">
            Fechar
          </button>
          <button
            v-if="totalPriceCart > 0"
            type="button"
            class="btn btn-danger"
            @click="confirmOrder()"
          >
            Finalizar Compra
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

const totalPriceCart = computed(() => {
  return store.cart
    .reduce((total, product) => {
      return total + product.price * (product.quantity || 1);
    }, 0)
    .toFixed(2);
});

const props = defineProps<{
  isOpen: boolean;
  product: ProductInterface | null;
}>();

const store = productsStore();
const removefromCart = (id: number) => {
  store.removeFromCart(id);
  Swal.fire({
    title: "Produto removido com sucesso",
    text: "",
    icon: "success",
    confirmButtonText: "Ok",
  });
};

const confirmOrder = () => {
  store.cart = [];

  Swal.fire({
    title: "Compra Finalizada com sucesso",
    text: "",
    icon: "success",
    confirmButtonText: "Ok",
  });

  emit("close");
};

const emit = defineEmits<{
  (event: "close"): void;
}>();

watch(
  () => store.selectedProduct,
  (newProduct) => {
    if (newProduct) {
    }
  }
);
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
