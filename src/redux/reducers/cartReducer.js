


import * as actionType from '../constants/cartConstant'; 



export const cartReducer=(state={cartItems:[]},action) => {
    switch(action.type){
        case actionType.ADD_TO_CART:
            const item=action.payload;
            const exist=state.cartItems.find(product=> product.id===item.id);

            if(exist){
                return{...state, cartItems:state.cartItems.map(product=>product.id===item.id ? {...product, quantity: product.quantity+item.quantity}:product)}

            }else{
                return{...state, cartItems:[...state.cartItems,item]}
            }

        case actionType.REMOVE_FROM_CART:
            return{...state,cartItems: state.cartItems.filter(product=>product.id!==action.payload)}

        case actionType.DECREASE_FROM_CART:
            const item1=action.payload;
            return{...state, cartItems:state.cartItems.map(product=>product.id===item1.id ? {...product, quantity: product.quantity-1}:product)}

        default:
            return state;
        
    }
}

