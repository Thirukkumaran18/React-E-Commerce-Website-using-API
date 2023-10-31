import React, {useState, useEffect} from 'react'
import { InputLabel, Select, MenuItem, Typography, Grid, Button } from '@material-ui/core'
import {useForm, FormProvider} from 'react-hook-form'
import CustomTextField from './CustomTextField';
import { Commercefile } from '../../lib/Commercefile';

const AddressForm = ({checkoutToken}) => {

  const [shippingCountries, setshippingCountries] = useState([])
  const [shippingCountry, setshippingCountry] = useState('')
  const [shippingSubdivisons, setshippingSubdivisons] = useState([])
  const [shippingSubdivison, setshippingSubdivison] = useState('')
  const [shippingOptions, setshippingOptions] = useState([])
  const [shippingoption, setshippingoption] = useState('')

  const countriesArray = Object.entries(shippingCountries).map(([code, name]) => ({id:code, label:name}))
  const subDivisionsArray = Object.entries(shippingSubdivisons).map(([code, name]) => ({id:code, label:name}))


  const methods = useForm();

  const fetchShippingCountries = async (checkoutTokenId) => {
    const {countries} = await Commercefile.services.localeListShippingCountries(checkoutTokenId)
    setshippingCountries(countries);
    setshippingCountry(Object.keys(countries)[0]);  // [AD,AE,AF...] => AD
  }

  const fetchShippingSubdivisions = async (countryCode) => {
      const {subDivision} = await Commercefile.services.localeListShippingSubdivisions(countryCode);
      
      setshippingSubdivisons(subDivision);
      // setshippingSubdivison(Object.keys(subDivision)[0]);
  }

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  },[])

  useEffect(() => {
      if(shippingCountry) fetchShippingSubdivisions(shippingCountry)
  },[shippingCountry]);  // whenever shippingCountry changes this useEffec will be called .

  return (
    <>
        <Typography gutterBottom variant='h6'>Shipping Address</Typography>
        <FormProvider {...methods}>
            <form  style={{marginTop:'10px', marginBottom:'10px'}}>
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

                  {/* <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                      <InputLabel>Shipping options</InputLabel>
                      <Select value={} fullWidth onChange={}>
                        <MenuItem key={}  >Select me</MenuItem>
                      </Select>
                  </Grid> */}

                </Grid>
            </form>
        </FormProvider>
    </>
  )
}

export default AddressForm
