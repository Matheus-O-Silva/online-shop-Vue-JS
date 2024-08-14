import type { ProductInterface } from "./ProductInterface";

export interface StateInterface {
    products: ProductInterface[];
    cart: ProductInterface[];
    modal: boolean;
    selectedProduct: ProductInterface | null;
}