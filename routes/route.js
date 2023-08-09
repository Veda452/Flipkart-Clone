import express from 'express';
import { userSignup, userlogin } from '../contoller/user-controller.js';
import { getProductById, getProducts } from '../contoller/product-contoller.js';
import { orderPayment, verifyPayment } from '../contoller/payment-controller.js';



const router=express.Router();


router.post('/signup',userSignup);
router.post('/login',userlogin);

router.get('/products',getProducts);
router.get('/product/:id',getProductById);

router.post('/orders',orderPayment);
router.post('/verify',verifyPayment);


export default router;