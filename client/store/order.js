/* eslint-disable no-case-declarations */
import axios from 'axios';

/**
 * ACTION TYPES
 */
const IN_CART = 'IN_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const DELETE_FROM_CART = 'DELETE_FROM_CART';
const UPDATE_ITEM_CART = 'UPDATE_ITEM_CART';

/**
 * ACTION CREATORS
 */
const inCart = cart => ({type: IN_CART, cart});
const addingToCart = item => ({type: ADD_TO_CART, item});
const deleteFromCart = itemId => ({type: DELETE_FROM_CART, itemId});
const updateItemCart = updated => ({type: UPDATE_ITEM_CART, updated});

/**
 * INITIAL STATE
 */
const defaultItemList = {cart: {items: []}};

/**
 * THUNK CREATORS
 */
export const insideCart = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/cart`);
    dispatch(inCart(data));
  } catch (error) {
    console.error(error);
  }
};

export const addToCart = (itemId, quantity, itemPrice) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/orders/addcart`, {
      itemId,
      quantity,
      itemPrice
    });
    dispatch(addingToCart(data));
  } catch (error) {
    console.error(error);
  }
};

export const removeItem = (itemId, orderId) => async dispatch => {
  try {
    await axios.delete(`/api/orders/cart/${orderId}/${itemId}`);

    dispatch(deleteFromCart(itemId));
  } catch (error) {
    console.error(error);
  }
};

export const updateItem = (
  itemId,
  orderId,
  quantity,
  price
) => async dispatch => {
  try {
    console.log(
      'Update Item thunk is running',
      quantity,
      itemId,
      orderId,
      price
    );
    const {data} = await axios.put('/api/orders/cart', {
      itemId,
      orderId,
      quantity,
      price
    });

    dispatch(updateItemCart(data));
  } catch (error) {
    console.error(error);
  }
};

/**
 * REDUCER
 */
export default function(state = defaultItemList, action) {
  switch (action.type) {
    case IN_CART:
      return {...state, cart: action.cart};

    case ADD_TO_CART:
      return {
        ...state,
        cart: {...state.cart, items: [...state.cart.items, action.item]}
      };

    case DELETE_FROM_CART:
      const updatedItemsAfterDelete = state.cart.items.filter(
        item => item.id !== action.itemId
      );
      return {...state, cart: {...state.cart, items: updatedItemsAfterDelete}};

    case UPDATE_ITEM_CART:
      const updatedItems = state.cart.items.map(item => {
        if (item.id === action.itemId) {
          item.quantity = action.quantity;
          item.total = action.total;
          return item;
        } else {
          return item;
        }
      });
      return {...state, cart: {...state.cart, items: updatedItems}};
    default:
      return state;
  }
}
