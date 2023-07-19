import React from "react";
import { useDispatch } from "react-redux";

import { addCart, removeCart, updateCart } from "../../reducks/cart/operations";
import { useNavigate} from "react-router";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
	const token = (JSON.parse(localStorage.getItem("HIVE_TECHWEAR_LOGIN_USER_KEY")))?.token
	const { id, name, description, price, image } = props.products;
	let quantity = props.cart ? props.cart.quantity : 0;
	const cartId = props.cart ? props.cart.id : 0;

	const dispatch = useDispatch();
const navigate = useNavigate()
	const addToCart = () => {
		if(token){
					dispatch(addCart({ quantity: 1, product: id }));
		}else{
			navigate("/sign-in")
		}

	};

	const increaseCart = () => {
		++quantity;
		dispatch(updateCart({ quantity }, cartId));
	};

	const decreaseCart = () => {
		--quantity;
		if (quantity <= 0) {
			dispatch(removeCart(cartId));
		}
		dispatch(updateCart({ quantity }, cartId));
	};
	return (
		<div className="product-card">
			<Link to ='/preview' state={{ id, name, description, price, image, quantity, cartId }} >

			
			<img className="product-image" src={image} alt="product" />
			<div className="product-content">
				<p className="product-title">{name}</p>
				<p className="product-description">{description}</p>
			</div>
			</Link>
			<div className="price-content">
				<p className="product-price">${price}</p>
				{quantity > 0 ? (
					<div className="added-cart">
						<span onClick={decreaseCart}> - </span>
						<span className="margin-top-4"> {quantity} </span>
						<span onClick={increaseCart} className="margin-top-4">
							+
						</span>
					</div>
				) : (
					<button onClick={addToCart} className="add-cart-btn">
						Add +
					</button>
				)}
			</div>
		</div>
	);
}
