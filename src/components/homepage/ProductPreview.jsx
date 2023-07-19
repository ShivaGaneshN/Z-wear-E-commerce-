// ProductPreview.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { addCart, fetchCarts, removeCart, updateCart } from "../../reducks/cart/operations";
import { clearCheckoutOrderErrorAction } from "../../reducks/order/actions";

const ProductPreview = () => {
  const navigate = useNavigate()
  const history = useNavigate();
    const token = (JSON.parse(localStorage.getItem("HIVE_TECHWEAR_LOGIN_USER_KEY")))?.token
    const location = useLocation()
    console.log("location", location)
    const [addCart1, setAddCart1] = useState(false)
    const product = location.state
    const dispatch = useDispatch()
    
    console.log(product.cartId)
    let cartItems = useSelector(state=> state.carts.results)
    useEffect(()=>{
        dispatch(fetchCarts());
    },[addCart1])
    const cartItem = cartItems.filter(cartItem=>cartItem.product.id ===product.id)
   
    const cartQuantity = cartItem[0]?.quantity
    const cartId = cartItem[0]?.id
    console.log("cartQuantity",cartQuantity)
    const addToCart = () => {
		if(token){
					dispatch(addCart({ quantity: 1, product: product.id }));
          setAddCart1(!addCart1)
		}else{
			navigate("/sign-in")
		}

	};

	const increaseCart = () => {
        let quantity = cartQuantity
		++quantity;
		dispatch(updateCart({ quantity }, cartId));
	};

	const decreaseCart = () => {
        let quantity = cartQuantity
		--quantity;
		if (quantity <= 0) {
			dispatch(removeCart(cartId));
		}
		dispatch(updateCart({ quantity }, cartId));
	};
       
  // Dummy data for customer reviews and overall ratings
  const customerReviews = [
    {
      id: 1,
      name: "John Doe",
      review: "This product is amazing!",
      rating: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      review: "Great quality and fast delivery.",
      rating: 4,
    },
    // Add more dummy customer reviews here
  ];

  // Calculate the average rating
  const overallRating =
    customerReviews.reduce((total, review) => total + review.rating, 0) /
    customerReviews.length;

  return (
    <div className="product-preview">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details">
        <h2 className="homepage-title">{product.name}</h2>
        <p className="homepage-subtitle">{product.description}</p>
        <p className="homepage-category-text">Price: ${product.price}</p>
        <div className="price-content price">
				{cartQuantity > 0 ? (
					<div className="added-cart">
						<span onClick={decreaseCart}> - </span>
						<span className="margin-top-4"> {cartQuantity} </span>
						<span onClick={increaseCart} className="margin-top-4">
							+
						</span>
					</div>
				) : (
					<button onClick={addToCart} className="add-cart-btn">
						Add +
					</button>
				)}
                <button
										onClick={() => {
											history("/checkout");
											dispatch(clearCheckoutOrderErrorAction());
										}}
										className="proceed-checkout"
									>
										PROCEED TO CHECKOUT
									</button>
			</div>
        <p className="homepage-category-text">Overall Rating: {overallRating.toFixed(1)}</p>

        {/* Display customer reviews */}
        <div className="category-list">
          <h3 className="homepage-category-text">Customer Reviews:</h3>
          <ul>
            {customerReviews.map((review) => (
              <li key={review.id} className="category-list-item">
                <p>{review.name}</p>
                <p>{review.review}</p>
                <p>Rating: {review.rating}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
