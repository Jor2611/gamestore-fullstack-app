import { Avatar, Flex, Text } from "@chakra-ui/react";

export function FetchedGameRow({ name, releaseDate, heroURL }) {
  return (
    <Flex direction='row' width='100%' my="25px">
      <Avatar
        name={name}
        src={heroURL}
        borderRadius='12px'
        me='16px'
      />
      <Flex flexDirection='column'>
        <Text fontSize='14px' mb='5px' color='#FFF'>
          <Text fontWeight='bold' fontSize='14px' as='span'>
            {name}
          </Text>
          
        </Text>
        <Text fontSize='xs' lineHeight='100%' color='#FFF'>
          {releaseDate}
        </Text>
      </Flex>
    </Flex>
  );
}
