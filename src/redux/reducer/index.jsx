import { actionTypes } from '../actionTypes'

const initialState = {
	products: [
		{
			id: 1,
			name: 'Плов',
			price: 100

		},
		{
			id: 2,
			name: 'Манты',
			price: 200
		},
		{
			id: 3,
			name: 'Курица с картофелем',
			price: 300
		}
	],
	cart: [],
}
export const reducer=(state=initialState, {type,payload}) => {
	switch(type) {
case actionTypes.GET_DATA:
	return {
		...state,
		products: payload
	}
case actionTypes.ADD_TO_CART:
	return {
		...state,
		cart: [...state.cart, payload]
	}
		
		default:
			return state
	}
}