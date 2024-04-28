import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const GameCardContainer = ({ children }: Props) => {
  return (
    <Box
    _hover={{ borderColor: "gray.600" }}
      borderWidth={1}
      borderStyle="solid"
      borderColor="transparent"
      overflow="hidden"
    >
      {children}
    </Box>
  );
};

export default GameCardContainer;
