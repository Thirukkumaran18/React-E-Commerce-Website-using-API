import React, {useState, useEffect} from 'react'
import { InputLabel, Select, MenuItem, Typography, Grid, Button } from '@material-ui/core'
import { Link } from 'react-router-dom';
import {useForm, FormProvider} from 'react-hook-form'
import CustomTextField from './CustomTextField';
import { Commercefile } from '../../lib/Commercefile';

const AddressForm = ({checkoutToken, next}) => {

  // console.log(checkoutToken.id)

  const [shippingCountries, setshippingCountries] = useState([])
  const [shippingCountry, setshippingCountry] = useState('')
  const [shippingSubdivisons, setshippingSubdivisons] = useState([])
  const [shippingSubdivison, setshippingSubdivison] = useState('')
  const [shippingOptions, setshippingOptions] = useState([])
  const [shippingOption, setshippingOption] = useState('')

  const countriesArray = Object.entries(shippingCountries).map(([code, name]) => ({id:code, label:name}))
  const subDivisionsArray = Object.entries(shippingSubdivisons).map(([code, name]) => ({id:code, label:name}))
  const optionsArray = shippingOptions.map((so) => ({id: so.id, label:`${so.description} - (${so.price.formatted_with_symbol})` }))

  // console.log(subDivisionsArray);


  const methods = useForm();

  const fetchShippingCountries = async (checkoutTokenId) => {
    const {countries} = await Commercefile.services.localeListShippingCountries(checkoutTokenId)
    setshippingCountries(countries);
    setshippingCountry(Object.keys(countries)[0]);  // [AD,AE,AF...] => AD
  }

  const fetchSubDivision = async (countryCode) =>  {
    const response = await Commercefile.services.localeListSubdivisions(countryCode)
    // console.log(response);
    // console.log(response.subdivisions.AR)
    setshippingSubdivisons(response.subdivisions)
    // console.log(response.subdivisions)
    setshippingSubdivison(Object.keys(response.subdivisions)[0])
    
  }

  const fetchOptions = async(checkoutToken,country, region = null ) => {
    const response = await Commercefile.checkout.getShippingOptions(checkoutToken, {country, region})
    setshippingOptions(response)
    setshippingOption(response[0].id)
  }

  // fetchOptions(checkoutToken.id, shippingCountry, shippingSubdivison);

  

  

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  },[])

  useEffect(() => {
    if(shippingCountry)  fetchSubDivision(shippingCountry) ;
  },[shippingCountry]) // whenever shippingCountry changes this effect will be re called

  useEffect(() => {
    if(shippingSubdivison) fetchOptions(checkoutToken.id, shippingCountry, shippingSubdivison);
  },[shippingSubdivison])

  
  return (
    <>
        <Typography gutterBottom variant='h6'>Shipping Address</Typography>
        <FormProvider {...methods}>
            <form  style={{marginTop:'10px', marginBottom:'10px'}} 
              onSubmit={methods.handleSubmit((data) => next({...data,shippingCountry,shippingSubdivison,shippingOption   }))}
            >
                <Grid container spacing={3}>
                  <CustomTextField name='firstName' label='First Name' required={true} />
                  <CustomTextField name='lastName' label='Last Name' required={true} />
                  <CustomTextField name='email' label='Email' required={true} />
                  <CustomTextField name='address' label='Address' required={true} />
                  <CustomTextField name='city' label='City' required={true} />
                  <CustomTextField name='zip' label='ZIP' required={true} />

                  <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                    <InputLabel>Shipping Country</InputLabel>
                      <Select value={shippingCountry} fullWidth onChange={(e) => setshippingCountry(e.target.value) } >
                        {
                          countriesArray.map((country) => (
                            <MenuItem key={country.id} value={country.id} >
                              {country.label}
                            </MenuItem>
                          ))
                        }
                          
                      </Select>
                  </Grid>

                  <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                      <InputLabel>Shipping Subdivisions</InputLabel>
                      <Select value={shippingSubdivison} fullWidth onChange={(e) => setshippingSubdivison(e.target.value)}>
                        {
                          subDivisionsArray.map((subDivision) => (
                            <MenuItem key={subDivision.id} value={subDivision.id}>
                              {subDivision.label}
                            </MenuItem>
                          ))
                        }
                      </Select>
                  </Grid>

                  <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                      <InputLabel>Shipping options</InputLabel>
                      <Select value={shippingOption} fullWidth onChange={(e) => setshippingOption(e.target.value)}>
                        {
                          optionsArray.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.label}
                            </MenuItem>
                          ))
                        }
                      </Select>
                  </Grid>
                </Grid>
                <br />
                  <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
                    <Button type='submit' variant='contained' color='primary'>Next</Button>
                  </div>
            </form>
        </FormProvider>
    </>
  )
}

export default AddressForm
