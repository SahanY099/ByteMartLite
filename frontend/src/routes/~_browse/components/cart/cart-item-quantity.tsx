import { ItemQuantityUpdateButton } from "./edit-item-quantity-button";

import { useDebouncedAddToCart, useDebouncedRemoveFromCart } from "@/lib/cart";

type CartQuantityProps = {
  productId: number;
  quantity: number;
};

export const CartItemQuantity = ({
  productId,
  quantity,
}: CartQuantityProps) => {
  const { add: increment, status: incrementStatus } =
    useDebouncedAddToCart(productId);
  const { remove: decrement, status: decrementStatus } =
    useDebouncedRemoveFromCart(productId);

  return (
    <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
      <ItemQuantityUpdateButton
        handleOnClick={() => decrement()}
        pending={decrementStatus == "pending"}
        type="minus"
      />
      <p className="w-6 text-center">
        <span className="w-full text-sm">{quantity}</span>
      </p>
      <ItemQuantityUpdateButton
        type="plus"
        pending={incrementStatus == "pending"}
        handleOnClick={() => increment()}
      />
    </div>
  );
};
