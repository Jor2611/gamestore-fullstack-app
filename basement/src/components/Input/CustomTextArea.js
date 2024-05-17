import { useController } from "react-hook-form";
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
    validate
  } = props;

  const { field, fieldState: { error } } = useController({
    name,
    control,
    rules: validate || null
  });

  return (
    <FormControl mb='20px'>
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
          <Textarea
            {...field} 
            color="#FFF"
            bg="rgb(19,21,54)"
            borderRadius="20px"
            border="transparent"
            fontSize="sm"
            size="lg"
            w={width || "100%"}
            rows={rows || 6}
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            value={field.value}
            ref={field.ref}
            resize={resizable}
            placeholder={placeholder}
          />
      </GradientBorder>
      <ErrorMessage error={error}/>
    </FormControl>
  )
}

export default CustomTextArea;