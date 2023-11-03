import React from 'react'
import { List, ListItem, ListItemText, Typography } from '@material-ui/core'

const Review = ({checkoutToken}) => {
  return (
    <>
        <Typography variant='h6'  gutterBottom>Order Summary</Typography>
        <List disablePadding>
            {
                checkoutToken.line_items.map((product) => (
                    <ListItem style={{padding:'10px 0'}} key={product.name}>
                        <ListItemText 
                            primary={product.product_name}
                            secondary={`Quantity: ${product.quantity}`}
                        />
                        <Typography variant='body2'>{product.price.formatted_with_symbol}</Typography>
                    </ListItem>
                ))
            }
            <ListItem style={{padding:'10px 0'}}>
                <ListItemText  primary='Total' />
                <Typography variant='subtitle1' style={{fontWeight:'700'}} >
                    {
                        checkoutToken.total.formatted_with_symbol
                    }
                </Typography>
            </ListItem>
        </List>
    </>
  )
}

export default Review
