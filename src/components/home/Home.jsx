import { Box,styled } from "@mui/material";
import Banner from "./Banner";
import NavBar from "./NavBar";
import { useEffect } from "react";
import { getProducts } from "../../redux/actions/productAction";
import { useDispatch,useSelector } from "react-redux";
import Slide from "./Slide";
import MidSlide from "./MidSlide";
import Midsection from "./MidSection";
const Container=styled(Box)`
    padding:10px 10px;
    background:#F2F2F2;

`
const Home =()=>{

    const { products }=useSelector(state=>state.getProducts);


    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getProducts());
    },[dispatch])

    return (
        <>
        <NavBar/>
        <Container>
            <Banner/>
            <MidSlide products={products} title="Deal of the Day" timer={true}/>
            <Midsection/> 
            <Slide products={products} title="Discounts for You" timer={false}/> 
            <Slide products={products} title="Suggesting Items" timer={false}/>
            <Slide products={products} title="Top Selection" timer={false}/>  
            <Slide products={products} title="Recomended Items" timer={false}/>
            <Slide products={products} title="Trending Offers" timer={false}/>  
            <Slide products={products} title="Season's top picks" timer={false}/> 
            <Slide products={products} title="Top Deals on Accessories" timer={false}/>     
              
        </Container>
        
        </>
        
    )
}

export default Home;