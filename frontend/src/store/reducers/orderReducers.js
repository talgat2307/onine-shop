import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_RESET,
  CREATE_ORDER_SUCCESS, ORDER_COMPLETED_SUCCESS, ORDERS_FAIL, ORDERS_REQUEST, ORDERS_SUCCESS,
} from '../constants/orderConstants';

const createOrderState = {
  loading: false,
  error: null,
  success: false,
};

export const createOrderReducer = (state = createOrderState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { ...state, loading: true };
    case CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, success: true };
    case CREATE_ORDER_FAIL:
      return { ...state, loading: false, success: false };
    case CREATE_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

const orderListState = {
  loading: false,
  error: null,
  orders: [],
};

export const orderListReducer = (state = orderListState, action) => {
  switch (action.type) {
    case ORDERS_REQUEST:
      return { ...state, loading: true };
    case ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.orders };
    case ORDERS_FAIL:
      return { ...state, loading: false, error: action.error };
    case ORDER_COMPLETED_SUCCESS:
      return { ...state, orders: state.orders.filter(order => order._id !== action.id) };
    default:
      return state;
  }
};