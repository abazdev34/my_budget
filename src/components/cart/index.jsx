import PropTypes from 'prop-types';

const Cart = ({ product }) => {
	return (
		<div className='cart'>
			<div className='cart-item'>
				<h3>{product.name}</h3> {/* Продукттун атын көрсөтүү */}
				<p>Price: ${product.price}</p> {/* Продукттун баасын көрсөтүү */}
			</div>
		</div>
	)
}


Cart.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Cart
