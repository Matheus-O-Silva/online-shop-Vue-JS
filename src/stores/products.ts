import { defineStore } from 'pinia';
import type { ProductInterface } from '@/types/ProductInterface';
import type { productStateInterface } from  '@/types/productStateInterface';

export const productsStore = defineStore('products', {
  state: (): productStateInterface => ({
    products: [],
    cart: [],
    modal: false,
    selectedProduct: null
  }),

  actions: {
    async fetchProductsFromDB() {
      const cachedProducts = localStorage.getItem('products');
      if (cachedProducts) {
        this.products = JSON.parse(cachedProducts);
        return;
      }

      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const json = await response.json();
        this.products = json.products.slice(0, 8);
        // store products in cache
        localStorage.setItem('products', JSON.stringify(this.products));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async getSelectProduct(id: number) {
      const response       = await fetch(`https://dummyjson.com/products/${id}`);
      const product        = await response.json();
      this.selectedProduct = product;
    },
    addToCart(product: ProductInterface): void {
      if(product){
        const existingProduct = this.cart.find((item) => item.id === product.id);

        if (existingProduct) {
          existingProduct.quantity   = (existingProduct.quantity || 1) + (product.quantity || 1);
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
