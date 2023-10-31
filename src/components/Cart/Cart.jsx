import React from 'react'
import { Container , Typography, Button, Grid } from '@material-ui/core'
import './cart.css'
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({cart , updateCartQuantity, removeFromCart, emptyCart}) => {
    const isEmpty = !cart && cart.line_items ? cart.line_items.length : 0;
    
  


    const EmptyCart = () => {
        return (

        <Typography variant='h3'>
            Your Cart is empty, add some produts !
        </Typography>
        )
    }

    let subtotal = cart.subtotal.formatted_with_symbol

    const FilledCart = () => {
        return (

        <>
          
            <Grid container spacing={3}>
                {   
                      cart.line_items ? 
                        cart.line_items.map((item) => (
                            <Grid item  xs={12} sm={6} md={4} lg={3} key={item.product_id} >
                                <CartItem 
                                    item={item} 
                                    updateCartQuantity={updateCartQuantity} 
                                    removeFromCart={removeFromCart}
                                    emptyCart={emptyCart} 
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
                    <Button type='button' color='secondary' variant='contained' size='large' onClick={emptyCart}>Empty Cart</Button>
                    <Button component={Link} to='/checkout' type='button' color='primary' variant='contained' size='large'>Checkout</Button>
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
