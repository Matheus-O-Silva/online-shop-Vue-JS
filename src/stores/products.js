import { defineStore } from 'pinia'

export const productsStore = defineStore('products', {
  state: () => ({
    products: [],
    cart: [],
    modal: false,
    selectedProduct: null
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
    getSelectProduct(id) {
      fetch(`https://dummyjson.com/products/${id}`)
        .then(res => res.json())
        .then(product => {
          this.selectedProduct = product;
        });
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