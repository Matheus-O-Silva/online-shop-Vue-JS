import { defineStore } from 'pinia'

export const productsStore = defineStore('products', {
  state: () => ({
    products: [],
    cart: [],
    modal: false
  }),

  actions: {
    fetchProductsFromDB() {
      // Could be GET or POST/PUT/PATCH/DELETE
      fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(json => {
          this.products = json.products.slice(0, 4);
        });

      /* { status: 'ok', method: 'GET' } */
    },
    addToCart(product) {
      this.cart.push(product);
    },
    removeFromCart(id) {
      this.cart = this.cart.filter((item) => item.id !== id)
    },
    openCloseModal() {
      this.modal = !this.modal;
    }
  }

})