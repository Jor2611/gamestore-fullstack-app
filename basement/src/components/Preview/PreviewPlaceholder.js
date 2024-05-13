import { Flex, Text, VStack } from '@chakra-ui/react';
import Brand from '../Sidebar/Brand';
import GradientBorder from '../GradientBorder/GradientBorder';

const PreviewPlaceholder = () => {
  return (
    <GradientBorder h='100%'>
      <Flex 
        width="100%" 
        height="100%" 
        justifyContent='center' 
        align='center' 
        bg='rgb(19,21,54)'
      >
        <VStack>
          <Brand logoText={'PLAYON BASEMENT'}/>
          <Text color='#FFF'>PREVIEW GOES HERE</Text>
        </VStack>
      </Flex>
    </GradientBorder>
  )
}

export default PreviewPlaceholder;