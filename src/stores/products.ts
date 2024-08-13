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
        const existingProduct = this.cart.find((item) => item.id === product.id);

        if (existingProduct) {
          existingProduct.quantity = (existingProduct.quantity || 1) + (product.quantity || 1);
          existingProduct.totalPrice = existingProduct.quantity * existingProduct.price;
        }else {
          this.cart.push(product);
        }
        
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
