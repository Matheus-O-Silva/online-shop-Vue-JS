export interface ProductInterface {
    id: number;
    title: string;
    description: string;
    price: number;
    totalPrice: number;
    brand: string;
    thumbnail: string;
    orderDetails?: string | null;
    quantity?: number | null
  }