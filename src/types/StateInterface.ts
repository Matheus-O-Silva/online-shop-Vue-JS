import type { ProductInterface } from "./ProductInterface";

export interface StateInterface {
    products: ProductInterface[];
    cart: [];
    modal: boolean;
    selectedProduct: ProductInterface | null;
}