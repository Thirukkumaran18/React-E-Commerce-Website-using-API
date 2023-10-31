import React , {useState, useEffect} from 'react'
import { Paper, Stepper, StepLabel, Step, Typography, CircularProgress, Divider, Button, Grid } from '@material-ui/core'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { Commercefile } from '../../../lib/Commercefile'


const steps = ['Shipping Address', 'Payment details']


const Checkout = ({cart}) => {

  const [activeStep , setActivestep] = useState(0)
  const [checkoutToken, setcheckoutToken] = useState(null);

  useEffect(() => {
      const generateTokenId = async () => {
        try {
          const token = await Commercefile.checkout.generateToken(cart.id, {type:'cart'});
          
          setcheckoutToken(token);
        } catch (error) {
          console.log(error)
        }

      }

      generateTokenId();

  },[cart]);

  const Confirmation = () => (
    <div>
      confirmation
    </div>
  )

  const Form  = () => (
    activeStep === 0 ? <AddressForm checkoutToken={checkoutToken}/> : <PaymentForm />
  )

  return (
    <>
        <div style={{marginTop:'100px'}}></div>
        <Grid container justifyContent='center'>
            <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
              <Paper  style={{ padding:'15px'}}>
                  <Typography variant='h4' align='center'>Checkout</Typography>
                  <Stepper activeStep={activeStep} >
                      {
                        steps.map((step) => (
                          <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                          </Step>
                        ))
                      }
                  </Stepper>
                  {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form /> }
              </Paper>
            </Grid>
        </Grid>
        
    </>
  )
}

export default Checkout
