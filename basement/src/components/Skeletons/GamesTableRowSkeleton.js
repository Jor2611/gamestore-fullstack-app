import {
  Flex,
  Td,
  Tr,
  Icon,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import { FaEllipsisVertical } from 'react-icons/fa6';


function GamesTableRowSkeleton(props) {
  const {
    lastItem
  } = props;

  return (
    <Tr>
      <Td
        ps='0px'
        w='330px'
        minW='330px'
        border={lastItem && "none"}
        borderBottomColor='#56577A'>
        <Flex 
          py='.8rem'
          minW='100%'
          align='center' 
          flexWrap='nowrap'>  
          <Skeleton
            w='55px'
            h='55px'
            me='18px'
            border='none'
            borderRadius='12px'
          />

          <Flex direction='column' w='45%'>
            <SkeletonText noOfLines={2}/>
          </Flex>
        </Flex>
      </Td>

      <Td
        w='180px'
        minW='180px'
        border={lastItem && "none"}
        borderBottomColor='#56577A'>
        <Flex direction='column'>
          <SkeletonText  noOfLines={3}/>
        </Flex>
      </Td>

      <Td
        w='160px'
        minW='160px'
        border={lastItem && "none"}
        borderBottomColor='#56577A'
      >
        <Flex direction='column'>
          <SkeletonText noOfLines={3}/>
        </Flex>
      </Td>

      <Td 
        w='100px'
        minW='100px'
        borderBottomColor='#56577A'
        border={lastItem && "none"} 
      >
        <Flex justifyContent='center'>
          <Skeleton
            w='49px'
            h='26px'
            borderRadius='8px'
          />
        </Flex>
      </Td>

      <Td 
        w='130px'
        minW='130px'
        border={lastItem && "none"} 
        borderBottomColor='#56577A'>
        <Flex justifyContent='center'>
          <Skeleton
            w='37px'
            h='26px'
            borderRadius='8px'
          />
        </Flex>
      </Td>

      <Td
        w='170px'
        minW='170px'
        border={lastItem && "none"} 
        borderBottomColor='#56577A'>
        <SkeletonText w='60%' noOfLines={1}/>
      </Td>

      <Td
        w='250px'
        minW='250px'
        border={lastItem && "none"} 
        borderBottomColor='#56577A'>
        <SkeletonText w='75%' noOfLines={1}/>
      </Td>

      <Td 
        w='150px'
        minW='150px'
        border={lastItem && "none"} 
        borderBottomColor='#56577A'>
        <Icon
          ml='25px'
          color='gray.400' 
          cursor='pointer'
          as={FaEllipsisVertical} 
        />  
      </Td>
    </Tr>
  );
}

export default GamesTableRowSkeleton;
