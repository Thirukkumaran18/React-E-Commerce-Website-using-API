import React from 'react'
import { useState } from 'react';
import { Container , Typography, Button, Grid } from '@material-ui/core'
import './cart.css'
import CartItem from './CartItem/CartItem';

const Cart = ({cart , updateCartQuantity}) => {
    const isEmpty = !cart && cart.line_items ? cart.line_items.length : 0;
    
  


    const EmptyCart = () => {
        return (

        <Typography variant='h3'>
            Your Cart is empty, add some produts !
        </Typography>
        )
    }

    let subtotal = cart.subtotal.raw

    const FilledCart = () => {
        return (

        <>
           {console.log(cart)}
            <Grid container spacing={3}>
                {   
                      cart.line_items ? 
                        cart.line_items.map((item) => (
                            <Grid item  xs={12} sm={6} md={4} lg={3} key={item.product_id} >
                                <CartItem 
                                    item={item} 
                                    updateCartQuantity={updateCartQuantity} 
                                     
                                />
                            </Grid>
        
                        ))
                        : <h1>Your Cart is empty !!!!!</h1>
                }
            </Grid>
            <div className='cartfooter'>
                <Typography className='price' style={{fontWeight:'bold'}} variant='h6'>
                    Subtotal:{subtotal}
                    
                </Typography>
                <div className='cartbuttons'>
                    <Button type='button' color='secondary' variant='contained' size='large'>Empty Cart</Button>
                    <Button type='button' color='primary' variant='contained' size='large'>Checkout</Button>
                </div>
            </div>
        </>
        )
    }

  return (
    <Container>
        <div style={{marginTop:'90px'}}></div>
        <Typography variant='h4' className='carttitle' gutterBottom>
            Your Shopping Cart
        </Typography>      
            {isEmpty ? <EmptyCart /> : <FilledCart />}
    </Container>
  )
}

export default Cart
