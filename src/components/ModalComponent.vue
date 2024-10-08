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
          <h5 class="modal-title" id="modalLabel">
            <slot name="title">{{ store.selectedProduct?.brand }}</slot>
          </h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <div class="product-image">
            <div v-if="!imageLoaded" class="placeholder">Carregando...</div>
            <img
              v-else
              class="image-modal"
              :src="store.selectedProduct?.thumbnail"
              alt=""
              @load="imageLoaded = true"
              @error="imageError = true"
            />
          </div>
          <p>{{ store.selectedProduct?.description }}</p>
          <p><strong>Preço:</strong> R${{ store.selectedProduct?.price }}</p>
          <div class="form-group">
            <label for="product-quantity"><strong>Quantidade:</strong></label>
            <input
              type="number"
              id="product-quantity"
              class="form-control"
              v-model.number="quantity"
              min="1"
            />
          </div>
          <div class="form-group mt-3">
            <label for="order-details"><strong>Detalhes do Pedido:</strong></label>
            <textarea
              id="order-details"
              class="form-control"
              v-model="orderDetails"
              rows="3"
              placeholder="Informe suas observações do produto..."
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">
            Fechar
          </button>
          <button type="button" class="btn btn-danger" @click="addToCart()">
            Adicionar ao Carrinho
          </button>
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, watch } from "vue";
import Swal from "sweetalert2";
import { productsStore } from "@/stores/products";
import type { ProductInterface } from "@/types/ProductInterface";

const store = productsStore();
const quantity = ref<number>(1);
const orderDetails = ref<string>("");
const imageLoaded = ref<boolean>(false);
const imageError = ref<boolean>(false);

const addToCart = () => {
  if (store.selectedProduct) {
    const productAdded: ProductInterface = {
      ...store.selectedProduct,
      totalPrice: store.selectedProduct.price * quantity.value,
      price: store.selectedProduct.price * quantity.value,
      quantity: quantity.value,
      orderDetails: orderDetails.value,
    };

    store.addToCart(productAdded);

    Swal.fire({
      title: "Produto adicionado com sucesso",
      text: "",
      icon: "success",
      confirmButtonText: "Ok",
    });

    quantity.value = 1;
    orderDetails.value = "";
    imageLoaded.value = false;
    imageError.value = false;

    emit("close");
  } else {
    console.error("error in add product operation");
  }
};

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
      imageLoaded.value = true;
      imageError.value = false;
    }
  }
);
</script>

<style scoped>
.product-image {
  box-shadow: 0px 0px 14px 1px #5f5757;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-bottom: 2%;
}

.image-modal {
  width: 60%;
  max-width: 100%;
  height: auto;
  display: block;
}

.placeholder {
  width: 100%;
  max-width: 400px;
  height: 300px;
  background-color: #e6d1d1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #aaa;
}

.modal {
  transition: opacity 0.3s ease;
}
</style>
