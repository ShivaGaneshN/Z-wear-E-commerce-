import API from "../../API";
import {
  checkoutOrderAction,
  checkoutOrderErrorAction,
  fetchOrderHistoryFailureAction,
  fetchOrderHistorySuccessAction,
} from "./actions";

const api = new API();

export const checkoutOrder = (addCartBody, onSuccess = null) => {
  return (dispatch) => {
    return api
      .checkoutOrder(addCartBody)
      .then(() => {
        dispatch(checkoutOrderAction());
        onSuccess();
      })
      .catch((error) => {
        dispatch(checkoutOrderErrorAction(error.response.data));
      });
  };
};

export const fetchOrderHistory = () => {
  return (dispatch) => {
    return api
      .getOrderHistory()
      .then((response) => {
        dispatch(fetchOrderHistorySuccessAction(response.results));
        console.log(response);
      })
      .catch((error) => {
        dispatch(fetchOrderHistoryFailureAction(error));
      });
  };
};
