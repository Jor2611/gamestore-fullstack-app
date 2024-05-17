import { Avatar, Flex, ListItem, Text } from "@chakra-ui/react";
import { FetchedGameRowSkeleton } from "../Skeletons/FetchedGameRowSkeleton";

export function FetchedGameRow(props){
  
  const {
    name,
    image,
    released,
    isLoading,
    isSelected,
    handleSelect 
  } = props;

  if(isLoading){
    return <FetchedGameRowSkeleton/>
  }
  
  return (
    <ListItem 
      p="3px"
      cursor='pointer'
      borderWidth="2px"
      borderRadius="20px"
      borderColor={ isSelected ? 'brand.500' : 'transparent' }
      _hover={{ bg: "brand.500" }}
      _active={{ bg: "transparent", borderColor: "brand.500" }}
      onClick={handleSelect}
    >
      <Flex direction='row' width='100%' my="25px">
        <Avatar
          me='16px'
          borderRadius='12px'
          name={name}
          src={image}
        />
        <Flex flexDirection='column'>
          <Text fontSize='14px' mb='5px' color='#FFF'>
            <Text fontWeight='bold' fontSize='14px' as='span'>
              {name}
            </Text>
            
          </Text>
          <Text fontSize='xs' lineHeight='100%' color='#FFF'>
            {released}
          </Text>
        </Flex>
      </Flex>
    </ListItem>
  );
}
