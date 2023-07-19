import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import Cart from "./containers/Cart";
import Checkout from "./containers/Checkout";
import Homepage from "./containers/Homepage";
import SignIn from "./containers/SignIn";
import SignUp from "./containers/SignUp";
import ThankYou from "./containers/ThankYou";
import { fetchUserFromLocalStorage } from "./reducks/users/operations";
import { getUser } from "./reducks/users/selectors";
import OrderHistoryelement from "./containers/order";
import ProductPreview from "./components/homepage/ProductPreview";

const Router = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const user = getUser(selector);
  const token = user ? user.token : null;
  useEffect(() => {
    dispatch(fetchUserFromLocalStorage());
    // eslint-disable-next-line
  }, []);

  return (
    <Routes>
      <Route  path={"/"} element={<Homepage />} />
      <Route  path={"/sign-in"} element={<SignIn/>} />
      <Route  path={"/sign-up"} element={<SignUp/>} />
      <Route  path={"/cart"} element={<Cart/>} />
      <Route  path={"/checkout"} element={<Checkout/>} />
      <Route  path={"/thank-you"} element={<ThankYou/>} />
      <Route  path={"/order-history"} element={<OrderHistoryelement/>} />
      <Route  path={"/preview"} element={<ProductPreview/>} />

    </Routes>
  );
};
export default Router;
