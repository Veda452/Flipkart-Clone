import { Button, ButtonGroup, styled } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addToCart, decreaseFromcart } from "../../redux/actions/cartAction"


const Component=styled(ButtonGroup)`
    margin-top:30px;
`
const StyledButton=styled(Button)`
    border-radius:50%;

`


const Buttongroup=({item})=>{
    const {loading, product}=useSelector(state=>state.getProductDetails);
    const navigate= useNavigate();
    const dispatch=useDispatch();
    const [itemQuantity,setItemQuantity]=useState(item.quantity);

    const  removeItemFromCart=(id)=>{
        dispatch(decreaseFromcart(id,product.quantity));
        setItemQuantity(item.quantity-1);
    }
    const addItemToCart=()=>{
        setItemQuantity(item.quantity+1);
        dispatch(addToCart(product.id,product.quantity));
        navigate('/cart');
    }

    return(
        <Component>
            <StyledButton onClick={()=>removeItemFromCart(item.id)}>-</StyledButton>
            <StyledButton>{itemQuantity}</StyledButton>
            <StyledButton onClick={()=>addItemToCart()}>+</StyledButton>
        </Component>
    )
}

export default Buttongroup;