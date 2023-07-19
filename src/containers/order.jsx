// OrderHistoryComponent.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderHistory } from "../reducks/order/operations";

// Import the CSS file for styling
import "./OrderHistoryComponent.css";

const OrderHistoryComponent = () => {
  const dispatch = useDispatch();
  const orderHistory = useSelector((state) => state.orders.orderHistory);
  const loading = useSelector((state) => state.orders.loading);
  const error = useSelector((state) => state.orders.error);

  useEffect(() => {
    dispatch(fetchOrderHistory());
  }, [dispatch]);

  if(!orderHistory || orderHistory.length ===0){
    return(
       <h3>No Order History found</h3>
    )
  }

  return (
    <div className="order-history-container">
  
 
      {orderHistory &&
        orderHistory.map((order, index) => (
          <div key={index} className="order-item">
            <h3>Order {index + 1}</h3>
            <p>Address: {order.address}</p>
            <ul className="order-items-list">
              {order.order_items.map((item, itemIndex) => (
                <li key={itemIndex} className="order-item-details">
                  <img
                    src={`https://res.cloudinary.com/techis/${item.product.image}`}
                    alt={item.product.name}
                  />
                  <div className="product-details">
                    <p className="product-name">{item.product.name}</p>
                    <p className="product-description">
                      {item.product.description}
                    </p>
                    <p className="product-quantity">Quantity: {item.qty}</p>
                    <p className="product-price">
                      ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default OrderHistoryComponent;
