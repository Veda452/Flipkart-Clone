import { InputBase,Box,styled, List, ListItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/actions/productAction';
import { Link } from 'react-router-dom';

const SearchContainer=styled(Box)`
background:#fff;
width:38%;
border-radius:2px;
margin-left:10px;
display:flex;
`

const InputSearchBase=styled(InputBase)`
padding-left:20px;
width:100%;
font-size:unset;
`

const SearchIconWrapper = styled(Box)`
color:blue;
padding:5px;
display:flex;
`
const Listwrapper=styled(List)`
    position:absolute;
    background:#FFFFFF;
    color:#000;
    margin-top:36px;
`

const Search = ()=>{
    const [text,setText]=useState('');
    const { products }=useSelector(state=>state.getProducts);
    const dispatch=useDispatch();
    
    const getText=(text)=>{
        setText(text);
    }

    useEffect(()=>{
        dispatch(getProducts())
    },[dispatch])

    return(
        <SearchContainer>
          <InputSearchBase
          placeholder='Serach for products, brands and more'
          onChange={(e)=>getText(e.target.value)}
          value={text}
          /> 
          <SearchIconWrapper>
            <SearchIcon/>
            </SearchIconWrapper> 
        {
            text && 
            <Listwrapper>
                {
                    products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product =>(
                        <ListItem>
                            <Link
                                to={`/product/${product.id}`}
                                onClick={()=>setText('')}
                                style={{textDecoration:'none', color:'inherit'}}
                            >
                                {product.title.longTitle}
                            </Link>
                        </ListItem>
                    ))
                }
            </Listwrapper>

        }
        </SearchContainer>

    )
}
export default Search;