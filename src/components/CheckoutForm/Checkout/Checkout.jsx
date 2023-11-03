import React , {useState, useEffect} from 'react'
import { Paper, Stepper, StepLabel, Step, Typography, CircularProgress, Divider, Button, Grid } from '@material-ui/core'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { Commercefile } from '../../../lib/Commercefile'
import { Link } from 'react-router-dom'


const steps = ['Shipping Address', 'Payment details']


const Checkout = ({cart, order, handleCaptureCheckout, error, refreshCart}) => {

  const [activeStep , setActivestep] = useState(0)
  const [checkoutToken, setcheckoutToken] = useState(null);
  const [isFinished, setisFinished] = useState(false)
  const [shippingData, setshippingData] = useState({})

  useEffect(() => {
      const generateTokenId = async () => {
        try {
          const token = await Commercefile.checkout.generateToken(cart.id, {type:'cart'});
          
          setcheckoutToken(token);
        } catch (error) {
          
        }

      }

      generateTokenId();

  },[cart]);

  const nextStep = () => setActivestep((prevActiveStep) => prevActiveStep + 1) 
  const backStep = () => setActivestep((prevActiveStep) => prevActiveStep -1) 

  const next = (data) => {
      setshippingData(data)
      nextStep();
  }

  const timeOut = () => {
   setTimeout(() => {
    setisFinished(true)
   }, 3000)
  }

  let Confirmation = () => order.customer ?  (
    <>
      <div>
      <Typography variant='h5'>Thank you for the purchase , {order.customer.firstname} </Typography>
      <Divider />
      </div>
      <br />
      <Button component={Link} to="/" variant='outlined' >Back to home</Button>
    </>
  ) : isFinished ? (
    <>
      <Typography variant='h6'>Thank you for the purchase </Typography>
      <Button component={Link} to="/" variant='outlined' 
        onClick={() => refreshCart()}
      >Back to home</Button>
      
    </>
    
  ) : <>
    <div>
          <CircularProgress />
          <br />
          <Button component={Link} to="/" variant='outlined' >Back to home</Button>

    </div>
  </> 

  if(error){
    <>
      <Typography variant='h5' >Error: {error}</Typography>
    </>
  }

  const Form  = () => (
    activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next} /> : 
    <PaymentForm  shippingData={shippingData} 
        checkoutToken={checkoutToken} 
        backStep={backStep} 
        handleCaptureCheckout={handleCaptureCheckout}
        nextStep={nextStep}
        timeOut={timeOut}
    />
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
