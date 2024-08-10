export type CartItemData = {
  productId: number;
  quantity?: number;
};
export type CartItem = {
  id: number;
  name: string;
  image: string;
  total: string;
  quantity: number;
} & CartItemData;

export type Cart = {
  items: CartItem[];
  total: string;
};
