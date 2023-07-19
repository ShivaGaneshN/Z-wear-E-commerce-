import initialState from "../store/initialState";
import * as Actions from "./actions";

export const OrdersReducer = (state = initialState.orders, action) => {
  switch (action.type) {
    case Actions.CHECKOUT_ORDER:
      return {
        ...state,
      };
    case Actions.CHECKOUT_ORDER_ERROR:
      return {
        ...state,
        errors: action.payload.errors,
      };
    case Actions.CLEAR_CHECKOUT_ORDER_ERROR:
      return {
        ...state,
        errors: {
          customer_name: null,
          customer_phone: null,
          address: null,
          pin_code: null,
          city: null,
          state: null,
        },
      };
    case Actions.FETCH_ORDER_HISTORY_SUCCESS:
      return {
        ...state,
        orderHistory: action.payload,
        loading: false,
        error: null,
      };
    case Actions.FETCH_ORDER_HISTORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
