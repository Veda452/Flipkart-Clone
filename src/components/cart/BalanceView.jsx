import { Box, Typography, styled } from "@mui/material"
import { useEffect, useState } from "react"

const HeadingWrapper=styled(Box)`
    padding:15px 20px;
    background:#fff;
    border-radius:1px solid #f0f0f0;
`
const Heading=styled(Typography)`
    color:#878787;

`
const Container=styled(Box)`
    padding:15px 24px;
    background:#fff;
    & > p{
        margin-bottom:20px;
        font-size:14px;
    }
`
const Price=styled(Box)`
    float:right;
`
const Discount=styled(Typography)`
    color:green;
    font-weight:500;
`

const BalanceView=({cartItems})=>{

    const [price,setPrice]=useState(0);
    const [discount,setDiscount]=useState(0);

    useEffect(()=>{
        totalAmount();
    },[cartItems]);

    const totalAmount=()=>{
        let price=0,discount=0;
        cartItems.map(item=>{
            price+=(item.price.mrp*item.quantity);
            discount+=(item.price.mrp*item.quantity-item.price.cost*item.quantity);
        });
        setPrice(price);
        setDiscount(discount);
    }

    return(
        <Box>
            <HeadingWrapper>
                <Heading>PRICE DETAILS</Heading>
            </HeadingWrapper>
            <Container>
                <Typography>Price ({cartItems?.length} items)
                    <Price component="span">₹{price}</Price>
                </Typography>
                <Typography>Discount
                    <Price component="span">-₹{discount}</Price>
                </Typography>
                <Typography>Delivery Charges
                    <Price component="span">₹40</Price>
                </Typography>
                <Typography variant="h6" style={{marginBottom:20}}>Total Amount
                    <Price component="span">₹{price-discount+40}</Price>
                </Typography>
                <Discount>You will save ₹{discount -40} on this item</Discount>
            </Container>
        </Box>
    )

}

export default BalanceView;