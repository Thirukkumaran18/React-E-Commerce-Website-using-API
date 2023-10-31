import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const CustomTextField = ({ name, label, required }) => {
  const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
       <Controller 
            as={TextField}
            control={control}
            name = {name} 
            label={label}
            required={required}
            render={( {field}) => ( 
                <TextField 
                {...field}
                label={label}
                fullWidth
                required={required}
                
                />
            )}
       />
    </Grid>
  );
}

export default CustomTextField;







