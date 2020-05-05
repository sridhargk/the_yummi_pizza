import {
  ADD_TO_CART,
  SUB_QUANTITY,
  ADD_QUANTITY,
  REMOVE_ITEMS,
} from "./cartActionLabels";

/** Add Item to Cart */
export const addToCart = (cartItem) => {
  return {
    type: ADD_TO_CART,
    cartItem,
  };
};
/** Reduce Item Quantity from Cart */
export const subtractQuantity = (cartItem) => {
  return {
    type: SUB_QUANTITY,
    cartItem,
  };
};
/** Increase Item Quantity in Cart */
export const addQuantity = (cartItem) => {
  return {
    type: ADD_QUANTITY,
    cartItem,
  };
};
/** Increase Item Quantity in Cart */
export const removeItems = (cartItem) => {
  return {
    type: REMOVE_ITEMS,
    cartItem,
  };
};
