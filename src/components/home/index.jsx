import { useSelector } from 'react-redux'
import Cart from '../cart'

const Home = () => {
	const products = useSelector((state) => state.products)
	console.log('products', products)
	return (
		<div>
			{products.map((product) => (
				<Cart key={product.id} product={product} />
			))}
		</div>
	)
}

export default Home
