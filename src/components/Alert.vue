<template>
  <div class="errors mt-2">
    <slot name="alert"></slot>
  </div>
</template>

<script setup></script>

<style scoped>
.errors {
  display: flex;
  justify-content: center;
  margin-bottom: -1%;
}
</style>
