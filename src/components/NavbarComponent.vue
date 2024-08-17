<template>
  <CartModalComponent
    :product="null"
    :isOpen="isModalOpen"
    @close="isModalOpen = false"
  />
  <OrdersModalComponent
    :isOrdersModalOpen="isOrdersModalOpen"
    @close="isOrdersModalOpen = false"
  />
  <nav class="navbar navbar-expand-md navbar-light bg-danger shadow-sm navbartop">
    <div class="container">
      <a class="navbar-brand font-bold text-white navbarTitle" href=""> Delivery </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Left Side Of Navbar -->
        <ul class="navbar-nav ms-auto">
          <li class="nav-item active Icons">
            <a class="nav-link" @click="showOrdersModal()" style="color: white">
              <!-- Icon SVG -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              <div
                class="text-md mt-2 bg-gray-600 text-white absolute rounded bg-opacity-50 shadow-xl hidden top-8 py-1 px-2 whitespace-pre"
                id="tooltiporderhistory"
              ></div>
            </a>
          </li>

          <!-- disabled link for spacing -->
          <li class="nav-item disabled">
            <a class="nav-link" style="color: white"><span class="sr-only"></span></a>
          </li>
          <!-- disabled link for spacing -->
          <li class="nav-item disabled">
            <a class="nav-link" style="color: white"><span class="sr-only"></span></a>
          </li>

          <li class="nav-item active relative Icons">
            <a class="nav-link" @click="showCartModal()" style="color: white">
              <div
                class="flex"
                id="navbtncart"
                aria-describedby="tooltipcart"
                data-tooltip-text="Cart"
              >
                <!-- Icon SVG -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <div
                  class="text-md mt-2 bg-gray-600 text-white absolute rounded bg-opacity-50 shadow-xl hidden top-8 py-1 px-2 whitespace-pre"
                  id="tooltipcart"
                ></div>
              </div>
              <div class="absolute top-0.5 right-0"></div>
            </a>
          </li>

          <!-- disabled link for spacing -->
          <li class="nav-item disabled">
            <a class="nav-link" style="color: white"><span class="sr-only"></span></a>
          </li>
          <!-- disabled link for spacing -->
          <li class="nav-item disabled">
            <a class="nav-link" style="color: white"><span class="sr-only"></span></a>
          </li>

          <!-- Authentication Links -->
          <li class="nav-item Icons">
            <router-link class="nav-link" style="color: white" :to="{ name: 'Auth' }"
              >Entrar
            </router-link>
          </li>

          <!-- disabled link for spacing -->
          <li class="nav-item disabled">
            <a class="nav-link" style="color: white"><span class="sr-only"></span></a>
          </li>
          <!-- disabled link for spacing -->
          <li class="nav-item disabled">
            <a class="nav-link" style="color: white"><span class="sr-only"></span></a>
          </li>

          <li class="nav-item Icons">
            <a class="nav-link" href="" style="color: white">Cadastrar</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";
import CartModalComponent from "@/components/CartModalComponent.vue";
import OrdersModalComponent from "@/components/OrdersModalComponent.vue";

const router = useRouter();
const isOrdersModalOpen = ref<boolean>(false);
const modalTitle = ref<string | null>(null);
const isModalOpen = ref<boolean>(false);

const showOrdersModal = () => {
  isOrdersModalOpen.value = true;
};

const showCartModal = () => {
  isModalOpen.value = true;
};
</script>

<style scoped>
.navbartop {
  height: 55px;
}

.HistoryIcon {
  cursor: pointer;
  height: 10%;
  width: 10%;
}

.Icons {
  cursor: pointer;
  height: 15%;
  width: 15%;
  margin-top: 5%;
}

.debugger {
  width: 10px;
  border: 1px solid black;
}

#navbarSupportedContent {
  height: 50px;
}

.navbarTitle {
  font-weight: bold;
}
</style>
