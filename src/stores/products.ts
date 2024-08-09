import { defineStore } from 'pinia';
import type { ProductInterface } from '@/types/ProductInterface';

interface State {
  products: ProductInterface[];
  cart: [];
  modal: boolean;
  selectedProduct: ProductInterface | null;
}

export const productsStore = defineStore('products', {
  state: (): State => ({
    products: [],
    cart: [],
    modal: false,
    selectedProduct: null
  }),

  actions: {
    async fetchProductsFromDB() {
      const response = await fetch('https://dummyjson.com/products');
      const json = await response.json();
      this.products = json.products.slice(0, 4);
    },
    async getSelectProduct(id: number) {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const product = await response.json();
      this.selectedProduct = product;
    },
    addToCart(product: ProductInterface) {
      //this.cart.push(product);
    },
    removeFromCart(id: number) {
      //this.cart = this.cart.filter((item) => item.id !== id);
    },
    openCloseModal() {
      this.modal = !this.modal;
    }
  }
});
