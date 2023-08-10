import { Box, Table, TableBody, TableCell, TableRow, Typography, styled } from "@mui/material";
import { LocalOffer as Badge} from '@mui/icons-material';

const SmallText=styled(Box)`
    vertical-align:baseline;
    & > p{
        font-size:14px;
        margin-top:10px;
    }
`;

const StyledBadge=styled(Badge)`
    margin-right:10px;
    color:#00CC00;
    font-size:15px;
`
const ColumnText=styled(TableRow)`
    font-size:14px;
    vertical-align:baseline;
    & > td{
        font-size:14px;
        margin-top:10px;
        border:none;
    }
`

const ProductDetail=({product})=>{
    const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';
    const date=new Date(new Date().getTime()+(5*24*3600*1000))
    return(
        <>
        <Typography>Available Offers</Typography>
        <SmallText>
            <Typography><StyledBadge/>Flat ₹100 Instant Cashback on Paytm Wallet. Min Order Value ₹1000. Valid once per Paytm account</Typography>
            <Typography><StyledBadge/>5% Cashback on Flipkart Axis Bank Car</Typography>
            <Typography><StyledBadge/>Buy 3-4 items save 5%; Buy 5 or more save 7%</Typography>
            <Typography><StyledBadge/>Buy 2 items save 5%; Buy 3 or more save 10%</Typography>
        </SmallText>
        <Table>
            <TableBody>
                <ColumnText>
                    <TableCell style={{color:'#878787'}}>Delivery</TableCell>
                    <TableCell style={{fontWeight: 600}}>Delivery by {date.toDateString()} | ₹40</TableCell>
                </ColumnText>
                <ColumnText>
                    <TableCell style={{color:'#878787'}}>Warranty</TableCell>
                    <TableCell >No Warranty</TableCell>
                </ColumnText>
                <ColumnText>
                    <TableCell style={{color:'#878787'}}>Seller</TableCell>
                    <TableCell >
                        <Box component='span' style={{color:'#2874f0'}} >SuperComNet</Box>
                        <Typography>GST invoice available</Typography>
                        <Typography>View more sellers starting from ₹{product.price.cost} </Typography>
                    </TableCell>
                </ColumnText>
                <ColumnText>
                    <TableCell colSpan={2}>
                        <img src={adURL} style={{width:390}} alt="flipkart coins" />
                    </TableCell>
                </ColumnText>
                <ColumnText>
                    <TableCell style={{color:'#878787'}}>Description</TableCell>
                    <TableCell >{product.description}</TableCell>
                </ColumnText>
            </TableBody>
        </Table>
        </>
    )
}


export default ProductDetail;