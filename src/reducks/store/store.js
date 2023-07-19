import { combineReducers, legacy_createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; // Import the middleware for handling async actions (e.g., Redux Thunk)

import { CartsReducer } from "../cart/reducers";
import { OrdersReducer } from "../order/reducers";
import { ProductsReducer } from "../product/reducers";
import { UserReducer } from "../users/reducers";

export default function configureStore() {
  return legacy_createStore(
    combineReducers({
      user: UserReducer,
      products: ProductsReducer,
      carts: CartsReducer,
      orders: OrdersReducer,
    }),
    composeWithDevTools(
      applyMiddleware(thunk) // Pass the middleware (e.g., Redux Thunk) here
      // other store enhancers if any
    )
  );
}
