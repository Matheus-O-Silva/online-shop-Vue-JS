import { defineStore } from 'pinia'

export const productsStore = defineStore('products', {
  state: () => ({
    products: []
  }),

  actions: {
    fetchProductsFromDB() {
      // Could be GET or POST/PUT/PATCH/DELETE
      fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(json => {
          this.products = json.products;
        });

      /* { status: 'ok', method: 'GET' } */
    }
  }

})