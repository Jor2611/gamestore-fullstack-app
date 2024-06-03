import { useContext, useRef } from 'react';
import {
  Box,
  Flex,
  Button,
  Heading,
  Text,
  ChakraProvider
} from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import { adminSignIn } from '../api/accountApi.js';
import { AdminContext } from '../store/AdminContext';
import theme from "../theme/themeAuth.js";
import signInImage from "../assets/img/signInImage.png";
import CustomInput from '../components/Input/CustomInput.js';
import CustomCheckbox from '../components/Input/CustomCheckbox.js';
import { useMutation } from 'react-query';


const LoginForm = () => {
  const adminCtx = useContext(AdminContext);
  const requestRef = useRef({});

  const { control, handleSubmit } = useForm({
    defaultValues: { email: '', password: '', rememberMe: false }
  });

  const onSubmit = async (values) => {
    try {
      requestRef.current.abort?.();
      const result = await adminSignIn(values, { abort: (abort) => { requestRef.current.abort = abort }});
      if(result.success){
        adminCtx.authenticateAdmin({ id: result.data.id, token: result.data.token });
      }
    } catch (error) {
      console.error('Submission failed', error);
    }
  };

  return (
    <ChakraProvider theme={theme} w='100%'>
      <Flex position='relative'>
        <Flex
          flexDirection='column'
          w='100%'
          maxW='1044px'
          minH='100vh'
          h={{ base: "120vh", lg: "fit-content" }}
          mx='auto'
          me={{ base: "auto", lg: "50px", xl: "auto" }}
          pt={{ sm: "100px", md: "0px" }}
        >
          <Flex
            alignItems='center'
            justifyContent='start'
            style={{ userSelect: "none" }}
            mx={{ base: "auto", lg: "unset" }}
            ms={{ base: "auto", lg: "auto" }}
            w={{ base: "100%", md: "50%", lg: "450px" }}
            px='50px'>
            <Flex
              direction='column'
              w='100%'
              background='transparent'
              mt={{ 
                base: "50px", 
                md: "150px", 
                lg: "160px", 
                xl: "245px" 
              }}
              mb={{ base: "60px", lg: "95px" }}
            >
              <Heading 
                color={"white"} 
                textAlign='center' 
                fontSize='32px' 
                mb='10px'
              >
                Nice to see you!
              </Heading>
              <Text
                mb='36px'
                ms='4px'
                color={"gray.400"}
                textAlign='center'
                fontWeight='bold'
                fontSize='14px'>
                  Enter your email and password to sign in
              </Text>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInput 
                  label={'Email'} 
                  name={'email'}
                  control={control}
                  type='email'
                  width={{ base: "100%", md: "346px" }}
                  placeholder='Your email address'
                />

                <CustomInput
                  label={'Password'}
                  name={'password'}
                  control={control}
                  type='password'
                  width={{ base: "100%", md: "346px" }}
                  placeholder='Your password'
                />

                <CustomCheckbox 
                  display='flex'
                  alignItems='center'
                  name='rememberMe'
                  label='Remember Me'
                  control={control}
                />

                <Button
                  variant='brand'
                  w='100%'
                  maxW='350px'
                  h='45'
                  my='20px'
                  fontSize='10px'
                  type='submit'
                >
                  SIGN IN
                </Button>
              </form>
            </Flex>
          </Flex>
          <Box
            display={{ base: "none", lg: "block" }}
            overflowX='hidden'
            w='960px'
            maxW={{ md: "50vw", lg: "50vw" }}
            minH='100vh'
            h='100%'            
            position='absolute'
            left='0px'
          >
            <Box
              bgImage={signInImage}
              w='100%'
              h='100%'
              bgSize='cover'
              bgPosition='50%'
              position='absolute'
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
            >
              <Text
                textAlign='center'
                color='white'
                letterSpacing='8px'
                fontSize='20px'
                fontWeight='500'>
                WELCOME TO
              </Text>
              <Text
                textAlign='center'
                color='transparent'
                letterSpacing='8px'
                fontSize='36px'
                fontWeight='bold'
                bgClip='text !important'
                bg='linear-gradient(94.56deg, #FFFFFF 79.99%, #21242F 102.65%)'
              >
                PLAYON BASEMENT
              </Text>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default LoginForm