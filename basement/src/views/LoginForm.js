import { useContext } from 'react';
import {
  Box,
  Flex,
  Button,
  Heading,
  Text,
  ChakraProvider
} from "@chakra-ui/react";
import theme from "../theme/themeAuth.js";
import signInImage from "../assets/img/signInImage.png";
import { AdminContext } from '../store/AdminContext';
import { adminSignIn } from '../utils/http';
import CustomInput from '../components/Input/CustomInput.js';
import CustomCheckbox from '../components/Input/CustomCheckbox.js';
import { useForm } from 'react-hook-form';



const LoginForm = () => {
  const initialValues = { email: '', password: '', rememberMe: false };
  const adminCtx = useContext(AdminContext);

  const { control, handleSubmit } = useForm({
    defaultValues: initialValues
  });

  const onSubmit = async (values) => {
    try {
      const result = await adminSignIn(values);
      adminCtx.authenticateAdmin({ id: result.data.id, token: result.data.token });
    } catch (error) {
      console.error('Submission failed', error);
    }
  };

  return (
    <ChakraProvider theme={theme} w='100%'>
      <Flex position='relative'>
        <Flex
          minH='100vh'
          h={{ base: "120vh", lg: "fit-content" }}
          w='100%'
          maxW='1044px'
          mx='auto'
          pt={{ sm: "100px", md: "0px" }}
          flexDirection='column'
          me={{ base: "auto", lg: "50px", xl: "auto" }}>
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
              mt={{ base: "50px", md: "150px", lg: "160px", xl: "245px" }}
              mb={{ base: "60px", lg: "95px" }}>
              <Heading color={"white"} fontSize='32px' mb='10px'>
                Nice to see you!
              </Heading>
              <Text
                mb='36px'
                ms='4px'
                color={"gray.400"}
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
                  placeholder='Your email address'
                  w={{ base: "100%", md: "346px" }}
                  h='46px'
                />
                <CustomInput
                  label={'Password'}
                  name={'password'}
                  control={control}
                  type='password'
                  placeholder='Your password'
                  w={{ base: "100%", md: "346px" }}
                  h='46px'
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
                  fontSize='10px'
                  type='submit'
                  w='100%'
                  maxW='350px'
                  h='45'
                  mb='20px'
                  mt='20px'
                  >
                    SIGN IN
                </Button>
              </form>
            </Flex>
          </Flex>
          <Box
            display={{ base: "none", lg: "block" }}
            overflowX='hidden'
            h='100%'
            maxW={{ md: "50vw", lg: "50vw" }}
            minH='100vh'
            w='960px'
            position='absolute'
            left='0px'>
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
              alignItems='center'>
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
                bg='linear-gradient(94.56deg, #FFFFFF 79.99%, #21242F 102.65%)'>
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