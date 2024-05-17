import { useController } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";
import { 
  Flex, 
  FormControl,
  FormLabel, 
  Input, 
  Text, 
  Icon 
} from "@chakra-ui/react";
import GradientBorder from "../GradientBorder/GradientBorder";
import ErrorMessage from "./ErrorMessage";


const CustomInput = (props) => {
  const { 
    name,
    type, 
    label, 
    placeholder,
    control,
    width,
    height,
    remove,
    validate
  } = props;

  const { field, fieldState: { error } } = useController({
    name,
    control,
    rules: validate || null
  });

  return (
    <FormControl>
      <FormLabel
        ms='4px'
        fontSize='sm'
        fontWeight='normal'
        color='white'>
          <Flex justifyContent={'space-between'} w='100%'>
            <Text color={error ? 'red.500' : 'white'}>{label}</Text>
            {remove && (
              <Icon 
                as={FaXmark} 
                color='gray.500' 
                mt='3px'
                cursor='pointer' 
                onClick={remove}  
              />
            )}
          </Flex>
      </FormLabel>
      <GradientBorder
        borderRadius='20px'>
        <Input
          {...field} 
          color="#FFF"
          bg="rgb(19,21,54)"
          borderRadius="20px"
          border="transport"
          fontSize="sm"
          size="lg"
          w={width || "100%"}
          h={height || '46px'}
          onChange={field.onChange}
          onBlur={field.onBlur}
          name={field.name}
          value={field.value}
          ref={field.ref}
          type={type || 'text'}
          placeholder={placeholder}
        />
      </GradientBorder>
      <ErrorMessage error={error}/>
    </FormControl>
  )
}

export default CustomInput;