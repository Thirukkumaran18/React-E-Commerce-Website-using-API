import React from 'react'
import { Card, CardMedia, CardActions, CardContent, Typography, Button } from '@material-ui/core'
import useStyles from './StyleCart'

const CartItem = ({item, updateCartQuantity}) => {
    const classes = useStyles();
    const productPrice = item.price.raw * item.quantity
    const item_quantity = item.quantity ;
  return (
    <Card>
        {console.log("Item",item)}
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
                onClick={() => updateCartQuantity(item.id, item_quantity - 1)} 
                >-</Button>
                
                <Typography style={{marginTop:'8px'}}>{item.quantity}</Typography>

                <Button 
                type='button' size='small' 
                onClick={() => updateCartQuantity(item.id,item_quantity + 1) }
                >+</Button>
                <Button type='button' variant='contained' color='secondary'>Remove</Button>
            </div>
        </CardActions>
    </Card>
  )
}

export default CartItem
