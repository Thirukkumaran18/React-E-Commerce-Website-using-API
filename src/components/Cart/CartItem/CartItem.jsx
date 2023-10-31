import React from 'react'
import { Card, CardMedia, CardActions, CardContent, Typography, Button } from '@material-ui/core'
import useStyles from './StyleCart'

const CartItem = ({item, updateCartQuantity, removeFromCart}) => {
    const classes = useStyles();
    const productPrice = item.price.raw * item.quantity

    const handleDecrease = () => {
        updateCartQuantity(item.id, item.quantity-1);
      };
    
      const handleIncrease = () => {
        updateCartQuantity(item.id, item.quantity=item.quantity+1);
      };
    
  return (
    <Card>
        
        <CardMedia image={item.image.url} alt={item.name}  className={classes.media} />
        <CardContent className={classes.CardContent} style={{display:'flex' , justifyContent:'space-between'}}>
            <Typography variant='h5' style={{fontWeight:'bold'}}>{item.name}</Typography>
            <Typography variant='h6' style={{fontWeight:'bold' }}>
               RS:{productPrice}
            </Typography>
        </CardContent>
        <CardActions>
            <div style={{display:'flex' ,alignItems:'center'}} className={classes.buttons}>

                < Button 
                type='button' size='small' 
                onClick={handleDecrease}
                >-</Button>
                
                <Typography style={{marginTop:'8px'}}>{item.quantity}</Typography>

                <Button 
                type='button' size='small' 
                onClick={handleIncrease}
                >+</Button>
                <Button type='button' variant='contained' color='secondary' onClick={() => removeFromCart(item.id)}>Remove</Button>
            </div>
        </CardActions>
    </Card>
  )
}

export default CartItem
