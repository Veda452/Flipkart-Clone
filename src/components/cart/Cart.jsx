import { Typography,Grid,Box, styled, Button } from "@mui/material";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import BalanceView from "./BalanceView";
import EmptyCart from "./EmptyCart";
import axios from "axios";


const Container=styled(Grid)(({theme})=>({
    padding:'30px 135px',
    [theme.breakpoints.down('md')]:{
        padding:'15px 0'
    }
}))
   

const Header=styled(Box)`
    padding:15px 24px;
    background:#fff;
`
const ButtonWrapper=styled(Box)`
    padding:16px 22px;
    background:#fff;
    box-shadow:0 2px 10px 0 rgb(0 0 0/ 10%);
    border-top:1px solid #f0f0f0;

`
const StyledButton=styled(Button)`
    display:flex;
    margin-left:auto;
    background:#fb641b;
    color: #fff;
    width:250px;
    height:51px;
`

const LeftComponent=styled(Grid)(({theme})=>({
    paddingRight:15,
    [theme.breakpoints.down('md')]:{
        marginBottom:15
    }
}))
    


const Cart=()=>{
    const { cartItems }=useSelector(state=>state.cart);


    let amt=40;
    cartItems.map(item=>{
        amt+=item.price.cost;
    });

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
			const { data } = await axios.post(orderUrl, { amount: amt});
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};



    return(
        <>
            {
                cartItems.length?
                    <Container container>
                        <LeftComponent item lg={9} md={9} sm={12} xs={12}>
                            <Header>
                                <Typography>My cart ({cartItems.length})</Typography>
                            </Header>
                            {
                                cartItems.map(item=>(
                                    <CartItem item={item}/>
                                ))
                            }
                            <ButtonWrapper>
                                <StyledButton variant="contained" onClick={()=>handlePayment()}>Place Order</StyledButton>
                            </ButtonWrapper>
                        </LeftComponent>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <BalanceView cartItems={cartItems}/>

                        </Grid>

                    </Container>
                :<EmptyCart/>
            }
        
        
        </>
    )
}

export default Cart;