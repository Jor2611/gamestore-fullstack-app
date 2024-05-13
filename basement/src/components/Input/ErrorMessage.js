import { Spacer, Text } from '@chakra-ui/react';

const ErrorMessage = ({error}) => {
  return error 
    ? (<Text mt='5px' color='red.500' fontSize='small'>{ error.message || 'Field is invalid' }</Text>) 
    : (<Spacer h='25px'></Spacer>);
}

export default ErrorMessage;