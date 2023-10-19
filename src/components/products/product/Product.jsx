import React from 'react'
import { Card,CardMedia,CardActions, Typography, IconButton, CardContent } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import useStyles from './styles';

const Product = ({product, onAddToCart}) => {
    const classes = useStyles();

    // console.log(product);
    // return (
    //     <div>text</div>
    // )
  return (
    
    <Card className={classes.root} style={{ width:'500px'}}>
        
         <CardMedia className={classes.media}  image={product.image.url} title={product.name} />
         <CardContent >
             <div className={classes.CardContent} style={{display:'flex', justifyContent:'space-between'}} >
                 <Typography variant='h5' gutterBottom >
                     {product.name}   
                 </Typography>
                 <Typography variant='h5' >
                    {product.price.formatted_with_symbol}
                 </Typography>
                 
             </div>
             <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant='body2' color='textSecondary' /> 
                 
         </CardContent>
         <CardActions  className={classes.CardActions} >
             <IconButton aria-label='Add to Cart' onClick={() => onAddToCart(product.id,1) }>
                 <AddShoppingCart  />
             </IconButton>
         </CardActions>
     </Card>
  );
}

export default Product
