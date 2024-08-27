<template>
  <div class="skeleton-loader">
    <div class="skeleton-image"></div>
    <div class="skeleton-content">
      <div class="skeleton-title"></div>
      <div class="skeleton-price"></div>
      <div class="skeleton-description"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.skeleton-loader {
  display: flex;
  padding: 16px;
  box-shadow: 0px 0px 14px 1px #615a5a;
  border-radius: 10px;
  background-color: #fff;
  align-items: center;
  width: 100%; /* Certifica-se de que o skeleton ocupa 100% da largura disponível */
  height: 120px; /* Mesma altura que o produto real */
}

.skeleton-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background: #e0e0e0;
  margin-right: 15px;
  animation: pulse 1.5s infinite ease-in-out;
  flex-shrink: 0;
}

.skeleton-content {
  flex-grow: 1;
  min-width: 0;
}

.skeleton-title,
.skeleton-price,
.skeleton-description {
  background: #e0e0e0;
  margin-bottom: 8px;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
}

.skeleton-title {
  width: 70%;
  height: 16px;
}

.skeleton-price {
  width: 50%;
  height: 16px;
}

.skeleton-description {
  width: 90%;
  height: 40px;
}

@keyframes pulse {
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #c0c0c0;
  }
  100% {
    background-color: #e0e0e0;
  }
}
</style>
