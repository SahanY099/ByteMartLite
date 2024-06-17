import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

import { useAddToCart, useRemoveFromCart } from "@/services/cart";

export const useDebouncedAddToCart = (productId: number) => {
  const { mutateAsync } = useAddToCart();

  const [quantity, setQuantity] = useState(0);
  const debouncedQuantity = useDebounce(quantity, 500);

  useEffect(() => {
    if (debouncedQuantity > 0) {
      mutateAsync({ productId, quantity: debouncedQuantity });
      setQuantity(0);
    }
  }, [debouncedQuantity, productId, mutateAsync]);

  const increment = (amount?: number) => {
    if (amount) {
      setQuantity((prev) => prev + amount);
      return;
    }
    setQuantity((prev) => prev + 1);
  };

  return increment;
};

export const useDebouncedRemoveFromCart = (productId: number) => {
  const { mutateAsync } = useRemoveFromCart();

  const [quantity, setQuantity] = useState(0);
  const debouncedQuantity = useDebounce(quantity, 500);

  useEffect(() => {
    if (debouncedQuantity > 0) {
      mutateAsync({ productId, quantity: debouncedQuantity });
      setQuantity(0);
    }
  }, [debouncedQuantity, productId, mutateAsync]);

  const remove = (amount?: number) => {
    if (amount) {
      setQuantity((prev) => prev + amount);
      return;
    }
    setQuantity((prev) => prev + 1);
    console.log(quantity);
  };

  return remove;
};
