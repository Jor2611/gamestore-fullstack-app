import { Controller } from "react-hook-form";
import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import GradientBorder from "../GradientBorder/GradientBorder";
import ErrorMessage from "./ErrorMessage";


const CustomTextArea = (props) => {
  const { 
    name,
    label, 
    placeholder,
    control, 
    rows, 
    width,
    resizable,
    error,
    validate
  } = props;

  return (
    <FormControl mb='24px'>
      <FormLabel
        ms='4px'
        fontSize='sm'
        fontWeight='normal'
        color={ error ? 'red.500' : 'white'}>
          {label}
      </FormLabel>
      <GradientBorder
        w={width}
        borderRadius='20px'>
          <Controller
            control={control}
            name={name}
            rules={validate || null}
            render={({ field }) => (
              <Textarea
                {...field} 
                color='white'
                bg='rgb(19,21,54)'
                border='transparent'
                borderRadius='20px'
                fontSize='sm'
                size='lg'
                w='100%'
                maxW='100%'
                rows={rows}
                resize={resizable}
                placeholder={placeholder}
              />
            )}
          />
      </GradientBorder>
      <ErrorMessage error={error}/>
    </FormControl>
  )
}

export default CustomTextArea;