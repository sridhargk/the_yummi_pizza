import {
  ADD_TO_CART,
  SUB_QUANTITY,
  ADD_QUANTITY,
} from "../actions/cartActionLabels";

const initialState = [];

export default function cartReducer(state = initialState, action = {}) {
  /***
   * ACTION: {
   *  type: "STRING",
   *  payload: "DATA"
   * }
   */

  switch (action.type) {
    case ADD_TO_CART:
      console.log("action: ", action);
      const cartItem = action.cartItem;
      const cartItems = state;

      const existingProductIndex = findCartItemIndex(cartItems, cartItem.name);

      const updatedCart =
        existingProductIndex >= 0
          ? updateProductUnits(cartItems, cartItem)
          : [...cartItems, cartItem];

      return updatedCart;
    case SUB_QUANTITY:
      return state;
    case ADD_QUANTITY:
      return state;
    default:
      return state;
  }
}

const findCartItemIndex = (cartItems, cartItemName) => {
  return cartItems.findIndex((item) => item.name === cartItemName);
};

const updateProductUnits = (cartItems, cartItem) => {
  const cartItemIndex = findCartItemIndex(cartItems, cartItem.name);

  const updatedCartItems = [...cartItems];
  const existingCartItem = updatedCartItems[cartItemIndex];

  const updatedCartItemsData = {
    ...existingCartItem,
    quantity: existingCartItem.quantity + cartItem.quantity,
    price: (existingCartItem.quantity + cartItem.quantity) * cartItem.price,
  };

  updatedCartItems[cartItemIndex] = updatedCartItemsData;

  return updatedCartItems;
};
