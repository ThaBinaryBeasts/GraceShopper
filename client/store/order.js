import axios from 'axios';

/**
 * ACTION TYPES
 */
const IN_CART = 'IN_CART';
const ADD_TO_CART = 'ADD_TO_CART';

/**
 * ACTION CREATORS
 */
const inCart = cart => ({type: IN_CART, cart});
const addingToCart = item => ({type: ADD_TO_CART, item});

/**
 * INITIAL STATE
 */
const defaultItemList = {cart: {}};

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

export const addToCart = (itemId, quanity, itemPrice) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/orders/addcart`, {
      itemId,
      quanity,
      itemPrice
    });
    dispatch(addingToCart(data));
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
      return {...state, cart: {...state.cart, items: action.item}};
    default:
      return state;
  }
}
