import { Flex, ListItem, Skeleton, SkeletonText } from "@chakra-ui/react";

export function FetchedGameRowSkeleton() {
  return (
    <ListItem
      p="3px"
      borderWidth="2px"
      borderRadius="20px"
      borderColor='transparent'
    >
      <Flex direction='row' width='100%' my="25px">
        <Skeleton
          w='48px'
          h='48px'
          me='16px'
          borderRadius='12px'
        />
        <Flex direction='column' w='160px'>
          <SkeletonText mt={"5px"} noOfLines={2} spacing={3}/>
        </Flex>
      </Flex>
    </ListItem>
  );
}
