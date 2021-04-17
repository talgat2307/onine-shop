import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS, ORDER_COMPLETED_FAIL, ORDER_COMPLETED_REQUEST, ORDER_COMPLETED_SUCCESS, ORDERS_FAIL,
  ORDERS_REQUEST, ORDERS_SUCCESS,
} from '../constants/orderConstants';
import axiosApi from '../../axiosApi';

const createOrderRequest = () => ({ type: CREATE_ORDER_REQUEST });
const createOrderSuccess = () => ({ type: CREATE_ORDER_SUCCESS });
const createOrderFail = error => ({ type: CREATE_ORDER_FAIL, error });

const ordersRequest = () => ({ type: ORDERS_REQUEST });
const ordersSuccess = orders => ({ type: ORDERS_SUCCESS, orders });
const ordersFail = error => ({ type: ORDERS_FAIL, error });

const orderCompletedRequest = () => ({ type: ORDER_COMPLETED_REQUEST });
const orderCompletedSuccess = (id) => ({ type: ORDER_COMPLETED_SUCCESS, id });
const orderCompletedFail = error => ({ type: ORDER_COMPLETED_FAIL, error });

export const createOrder = (order, id) => {
  return async dispatch => {
    dispatch(createOrderRequest());
    try {
      await axiosApi.post(`/orders/${id}`, order);
      dispatch(createOrderSuccess());
    } catch (e) {
      dispatch(createOrderFail(e.response && e.response.data.error
        ? e.response.data.error
        : e.message));
    }
  };
};

export const getOrders = () => {
  return async dispatch => {
    dispatch(ordersRequest());
    try {
      const response = await axiosApi('/orders');
      dispatch(ordersSuccess(response.data));
    } catch (e) {
      dispatch(ordersFail(e.response && e.response.data.error
        ? e.response.data.error
        : e.message));
    }
  };
};

export const completeOrder = (id) => {
  return async dispatch => {
    dispatch(orderCompletedRequest());
    try {
      await axiosApi.delete(`/orders/${id}`);
      dispatch(orderCompletedSuccess(id));
    } catch (e) {
      dispatch(orderCompletedFail(e.response && e.response.data.error
        ? e.response.data.error
        : e.message));
    }
  };
};

