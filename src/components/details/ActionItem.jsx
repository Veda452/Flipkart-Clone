import { Box, Button,styled } from "@mui/material";
import { ShoppingCart as Cart ,FlashOn as Flash} from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/cartAction";
import { useState } from "react";
import axios from "axios";

const LeftContainer=styled(Box)(({theme})=>({
    minWidth:'40%',
    padding:'40px 0 0 80px',
    [theme.breakpoints.down('lg')]:{
        padding:'20px 40px'
    }

}))


const Image=styled('img')({
    padding:15
})

const StyledButton=styled(Button)(({theme})=>({
    width:'48%',
    height:50,
    borderRadius:2,
    [theme.breakpoints.down('lg')]:{
        width:'46%'
    },
    [theme.breakpoints.down('sm')]:{
        width:'48%'
    }

}));

const ActionItem=({product})=>{

    const navigate= useNavigate();
    const dispatch=useDispatch();
    const {id}=product;
    const [quantity,setQuantity]=useState(1);

    const addItemToCart=()=>{
        dispatch(addToCart(id,quantity));
        navigate('/cart');
    }

    const initPayment = (data) => {
		const options = {
			key: "rzp_test_dQqxUGF8mQrSWg",
			amount: data.amount,
			currency: data.currency,
            id:data.id,
			description: "Test Transaction",
			handler: async (response) => {
				try {
					const verifyUrl = "https://flipkartclone7.onrender.com/verify";
					const { data } = await axios.post(verifyUrl, response);
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	const handlePayment = async () => {
		try {
			const orderUrl = "https://flipkartclone7.onrender.com/orders";
			const { data } = await axios.post(orderUrl, { amount: product.price.cost});
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};

    return(
         <LeftContainer>
            <Box style={{ padding:'15px 20px', border:'1px solid #f0f0f0',width:'90%'}}>
            <Image src={product.detailUrl} alt="product details" />
            </Box>
            <StyledButton variant="contained" style={{marginRight:10, background:'#ff9f00'}} onClick={()=>addItemToCart()} ><Cart/>  Add to Cart</StyledButton>
            <StyledButton variant="contained" style={{background:'#fb541b'}} onClick={()=>handlePayment()}><Flash/> Buy Now</StyledButton>
         </LeftContainer>
    )
}

export default ActionItem;