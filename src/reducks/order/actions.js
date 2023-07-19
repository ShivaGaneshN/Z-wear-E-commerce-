export const CHECKOUT_ORDER = "CHECKOUT_ORDER";
export const checkoutOrderAction = () => {
  return {
    type: CHECKOUT_ORDER,
  };
};

export const CHECKOUT_ORDER_ERROR = "CHECKOUT_ORDER_ERROR";
export const checkoutOrderErrorAction = (errors) => {
  return {
    type: CHECKOUT_ORDER_ERROR,
    payload: {
      errors,
    },
  };
};

export const CLEAR_CHECKOUT_ORDER_ERROR = "CLEAR_CHECKOUT_ORDER_ERROR";
export const clearCheckoutOrderErrorAction = () => {
  return {
    type: CLEAR_CHECKOUT_ORDER_ERROR,
  };
};

export const FETCH_ORDER_HISTORY_SUCCESS = "FETCH_ORDER_HISTORY_SUCCESS";
export const fetchOrderHistorySuccessAction = (orderHistory) => {
  return {
    type: FETCH_ORDER_HISTORY_SUCCESS,
    payload: orderHistory,
  };
};

export const FETCH_ORDER_HISTORY_FAILURE = "FETCH_ORDER_HISTORY_FAILURE";
export const fetchOrderHistoryFailureAction = (error) => {
  return {
    type: FETCH_ORDER_HISTORY_FAILURE,
    payload: error,
  };
};
