import React from 'react'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from './Review'
import { Typography, Divider, Button } from '@material-ui/core'




const PaymentForm = ({checkoutToken, backStep, shippingData, handleCaptureCheckout, nextStep, timeOut}) => {

  const stripePromise = loadStripe('process.env.REACT_APP_STRIPE_KEY');

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault()
    if(!stripe || !elements) return ;
    const cardElement = elements.getElement(CardElement)
    const {error, paymentMethod} = await stripe.createPaymentMethod({type:'card', card:cardElement});
    if(error){
      const orderData = {
        line_items : checkoutToken.line_items,
        customer : {
          firstname : shippingData.firstName,
          lastname : shippingData.lastName,
        },
        shipping : {
            name: 'Primary',
            street: shippingData.address ,
            town_city : shippingData.city ,
            county_state : shippingData.shippingSubdivison,
            postal_zip_code : shippingData.zip,
            country : shippingData.shippingCountry,
        },
        fullfillment : {
          shippingmethod : shippingData.shippingOption
        },
        payment : {
          gateway: 'stripe',
          
        }

    } 
    
    handleCaptureCheckout(checkoutToken.id, orderData)
    timeOut();
    nextStep()
    } else {
      console.log("error",error)
      
    }
  }

  return (
    <>
      <Review  checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant='h6' gutterBottom style={{margin:'10px 0'}}>Payment Methods</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {
            ({elements, stripe}) => (
                <form >
                    <CardElement />
                    <br /> <br />
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        <Button variant='outlined' onClick={backStep} >Back</Button>
                        <Button color='primary' type='submit'  disabled={!stripe}
                          onClick={(e) => handleSubmit(e,elements, stripe)}
                        >
                          {
                            `pay ${checkoutToken.subtotal.formatted_with_symbol}`
                          }
                        </Button>
                    </div>
                </form>
            )
          }
        </ElementsConsumer>
      </Elements>
      { 
        console.log(process.env.REACT_STRIPE_KEY)
      }
    </>
  )
}

export default PaymentForm
