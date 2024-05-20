import { Controller } from 'react-hook-form';
import { FormControl, FormLabel, Switch, DarkMode } from '@chakra-ui/react';


const CustomCheckbox = ({ name, label, control, ...rest}) => {
  return (
    <FormControl {...rest}>
      <Controller 
        control={control}
        name={name}
        render={({ field }) => (
          <DarkMode>
            <Switch {...field} id={name} colorScheme='brand' me='10px'/>
          </DarkMode>
        )}
      />
      <FormLabel htmlFor={name} fontWeight='normal' color='white' mb='0' ms='1'>
          {label}
      </FormLabel>
    </FormControl>
  )
}

export default CustomCheckbox;