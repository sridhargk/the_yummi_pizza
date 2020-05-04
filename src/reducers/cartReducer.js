import {
  ADD_TO_CART,
  SUB_QUANTITY,
  ADD_QUANTITY,
} from "../actions/cartActionLabels";

const initialState = [];

export default function cartReducer(state = initialState, action = {}) {
  const cartItem = action.cartItem;
  const cartItems = state;

  switch (action.type) {
    case ADD_TO_CART: // Add to cart reducer
      const existingProductIndex = findCartItemIndex(cartItems, cartItem.name);
      const updatedCart =
        existingProductIndex >= 0
          ? updateCartItemUnits(cartItems, cartItem)
          : [...cartItems, cartItem];

      return updatedCart;
    case SUB_QUANTITY: // Reduce item quantity in cart
      return updateCartItemUnits(cartItems, cartItem, "minus");
    case ADD_QUANTITY: // Add item quantity in cart
      return updateCartItemUnits(cartItems, cartItem);
    default:
      return state;
  }
}

const findCartItemIndex = (cartItems, cartItemName) => {
  return cartItems.findIndex((item) => item.name === cartItemName);
};

const updateCartItemUnits = (cartItems, cartItem, updateType = "add") => {
  const cartItemIndex = findCartItemIndex(cartItems, cartItem.name);

  const updatedCartItems = [...cartItems];
  const existingCartItem = updatedCartItems[cartItemIndex];
  let updatedCartItemsData;
  if (updateType === "add") {
    updatedCartItemsData = {
      ...existingCartItem,
      quantity: existingCartItem.quantity + 1,
      price: (existingCartItem.quantity + 1) * cartItem.product_price,
    };
  } else {
    updatedCartItemsData = {
      ...existingCartItem,
      quantity: existingCartItem.quantity - 1,
      price: (existingCartItem.quantity - 1) * existingCartItem.product_price,
    };
  }

  updatedCartItems[cartItemIndex] = updatedCartItemsData;
  if (updatedCartItemsData.quantity <= 0) {
    updatedCartItems.splice(cartItemIndex, 1);
  }

  return updatedCartItems;
};
