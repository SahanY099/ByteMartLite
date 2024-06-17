export type CartItemData = {
  productId: number;
  quantity?: number;
};
export type CartItem = {
  id: number;
  name: string;
  image: string;
  total: number;
  quantity: number;
} & CartItemData;

export type Cart = {
  items: CartItem[];
  total: number;
};
