import type { ProductInterface } from "./ProductInterface";

export interface productStateInterface {
    products: ProductInterface[];
    cart: ProductInterface[];
    modal: boolean;
    selectedProduct: ProductInterface | null;
}