import { defineStore } from 'pinia';
import type { ProductInterface } from '@/types/ProductInterface';
import type { StateInterface } from  '@/types/StateInterface';


export const productsStore = defineStore('products', {
  state: (): StateInterface => ({
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
    addToCart(product: ProductInterface): void {
      if(product){
        this.cart.push(product);
      }
      
      return;
    },
    removeFromCart(id: number) {
      if(id){
        this.cart = this.cart.filter((item) => item.id !== id);
      }
      
      return;
    }
  }
});
