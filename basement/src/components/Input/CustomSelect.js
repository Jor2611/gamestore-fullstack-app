import { Controller } from 'react-hook-form';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import GradientBorder from '../GradientBorder/GradientBorder';
import ErrorMessage from './ErrorMessage';

const CustomSelect = (props) => {

  const { 
    label, 
    name, 
    control, 
    options, 
    placeholder, 
    w, 
    validate, 
    error 
  } = props;

  const style = {
    container:(provided) => ({
      ...provided,
      w:'100%'
    }),
    control:(provided) => ({
      ...provided,
      color:'white',
      borderRadius:'20px',
      bg:'rgb(19,21,54)',
      fontSize:'sm',
      _hover: {},
      _focus: { bg:'rgb(19,21,54)' },
      minHeight: '46px',
      h: 'auto',
      textAlign: 'start'
    }),
    multiValue:(provided) => ({
      ...provided,
      color:'white',
      fontSize:'sm',
      size:'md',
      border:'1px',
      borderColor: 'grey',
      bg:'linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.69) 76.65%)'
    }),
    menuList:(provided)=>({
      ...provided,
      color:'white',
      bg:'rgb(19,21,54)',
      borderRadius:'20px',
      border:'transparent'
    }),
    option:(provided)=>({
      ...provided,
      bg:'rgb(19,21,54)',
      _hover: { bg: "whiteAlpha.100" }
    }),
    dropdownIndicator:(provided)=>({
      ...provided,
      bg:'rgb(19,21,54)',
      cursor: 'pointer'
    }),
  }

  return (
    <FormControl w={w} mb={10}>
      <FormLabel
        ms='4px'
        fontSize='sm'
        fontWeight='normal'
        color={ error ? 'red.500' :'white'}>
          {label}
      </FormLabel>
      <GradientBorder
        w={w}
        borderRadius='20px'
      >
        <Controller
          control={control}
          name={name}
          rules={validate || null}
          render={({ field }) => (
            <Select
              {...field}
              isSearchable
              isMulti
              options={options}
              placeholder={placeholder}
              chakraStyles={style}
              variant="filled"
            />
          )}
        />
      </GradientBorder>
      <ErrorMessage error={error}/>
    </FormControl>
  );
};

export default CustomSelect;
