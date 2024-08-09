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

<script setup>
import { ref, watch, defineEmits } from "vue";
import { productsStore } from "@/stores/products";

const store = productsStore();
const imageLoaded = ref(false);
const imageError = ref(false);

const emit = defineEmits(["close"]);

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  product: {
    type: Object,
    default: null,
  },
});

watch(
  () => store.selectedProduct,
  (newProduct) => {
    if (newProduct) {
      imageLoaded.value = true; // Resetar quando um novo produto é selecionado
      imageError.value = false; // Resetar erros
    }
  }
);

const closeModal = () => {
  console.log("clicoou");
  isModalOpen.value = false;
};
</script>

<style scoped>
.product-image {
  box-shadow: 0px 0px 14px 1px #2a2828;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-bottom: 2%;
}

.image-modal {
  width: 60%;
  max-width: 100%;
  height: auto;
  display: block; /* Garante que a imagem ocupa espaço */
}

.placeholder {
  width: 100%; /* Para que o espaço seja mantido */
  max-width: 400px;
  height: 300px; /* Defina uma altura fixa para o placeholder */
  background-color: #f0f0f0; /* Cor de fundo do placeholder */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #aaa; /* Cor do texto do placeholder */
}

.modal {
  transition: opacity 0.3s ease;
}
</style>
