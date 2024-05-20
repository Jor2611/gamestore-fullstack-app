import { useController } from 'react-hook-form';
import { FormControl, FormLabel } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import GradientBorder from '../GradientBorder/GradientBorder';
import ErrorMessage from './ErrorMessage';

const CustomSelect = (props) => {

  const { 
    name,
    label, 
    placeholder,
    control, 
    options, 
    validation
  } = props;

  const style = {
    container:(provided) => ({
      ...provided,
      w:'100%'
    }),
    control:(provided) => ({
      ...provided,
      color:'#FFF',
      textAlign: 'start',
      fontSize:'sm',
      minHeight: '46px',
      h: 'auto',
      bg:'rgb(19,21,54)',
      borderRadius:'20px',
      _hover: {},
      _focus: { bg:'rgb(19,21,54)' }
    }),
    multiValue:(provided) => ({
      ...provided,
      color:'white',
      fontSize:'sm',
      size:'md',
      bg:'linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.69) 76.65%)',
      border:'1px',
      borderColor: 'grey'
    }),
    menuList:(provided)=>({
      ...provided,
      color:'#FFF',
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
  };

  const { field, fieldState: { error } } = useController({
    name,
    control,
    rules: validation || null
  });

  return (
    <FormControl mb={10}>
      <FormLabel
        ms='4px'
        fontSize='sm'
        fontWeight='normal'
        color={ error ? 'red.500' :'white'}>
          {label}
      </FormLabel>
      <GradientBorder
        borderRadius='20px'>
        <Select
          {...field}
          isSearchable
          isMulti
          variant="filled"
          chakraStyles={style}
          options={options}
          placeholder={placeholder}
        />
      </GradientBorder>
      <ErrorMessage error={error}/>
    </FormControl>
  );
};

export default CustomSelect;
