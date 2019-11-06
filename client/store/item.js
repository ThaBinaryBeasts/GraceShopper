import axios from 'axios';

/**
 * ACTION TYPES
 */
const GET_ITEMS = 'GET_ITEMS';
const GET_SELECTED_ITEM = 'GET_SELECTED_ITEM';
const IN_CART = 'IN_CART';
const ADD_TO_CART = 'ADD_TO_CART';

/**
 * INITIAL STATE
 */
const defaultItemList = {items: [], item: {}, cart: []};

/**
 * ACTION CREATORS
 */
const getItems = items => ({type: GET_ITEMS, items});
const getItem = item => ({type: GET_SELECTED_ITEM, item});
const inCart = cart => ({type: IN_CART, cart});
const addingToCart = item => ({type: ADD_TO_CART, item});

/**
 * THUNK CREATORS
 */
export const getAllItems = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/items');
    dispatch(getItems(data || defaultItemList));
  } catch (err) {
    console.error(err);
  }
};

export const getSelectedItem = id => async dispatch => {
  try {
    console.log('thunk is running');
    const {data} = await axios.get(`/api/items/${id}`);
    dispatch(getItem(data || defaultItemList));
  } catch (err) {
    console.error(err);
  }
};

export const insideCart = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${userId}/cart`);
    dispatch(inCart(data));
  } catch (error) {
    console.error(error);
  }
};

export const addToCart = (itemId, quanity, userId) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/orders/${userId}/addcart`, {
      itemId,
      quanity
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
    case GET_ITEMS:
      return {...state, items: action.items};
    case GET_SELECTED_ITEM:
      return {...state, item: action.item};
    case IN_CART:
      return {...state, cart: action.cart};
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, action.item]};
    default:
      return state;
  }
}
