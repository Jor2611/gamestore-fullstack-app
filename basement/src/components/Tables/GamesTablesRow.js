import { memo } from 'react';
import {
  Avatar,
  Badge,
  Flex,
  Icon,
  Skeleton,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import { adaptToUpdateDate } from '../../utils/dateManager';
import ActionsMenu from '../Menu/ActionsMenu';


function GamesTableRow(props) {
  const {
    gameData: {
      id,
      logo,
      name,
      publisher,
      platforms,
      genres,
      rating,
      metacritic,
      released,
      updatedAt,
    },
    isLoading,
    lastItem,
    deleteDialogHandler
  } = props;


  return (
    <Tr>
      <Td
        ps='0px'
        w='330px'
        minW='200px'
        border={lastItem && 'none'}
        borderBottomColor='#56577A'>
        <Flex 
          py='.8rem'
          minW='100%'
          align='center' 
          flexWrap='nowrap'>          
          <Avatar
            src={logo}
            w='60px'
            h='60px'
            me='18px'
            bg='none'
            border='none'
            borderRadius='12px'
            loading='lazy'
            icon={<Skeleton
              w='60px'
              h='60px'
              border='none'
              borderRadius='12px'
            />}
          />

          <Flex direction='column'>
            <Text
              color='#fff'
              minWidth='100%'
              fontSize='sm'
              fontWeight='normal'>
              {name}
            </Text>
            <Text 
              color='gray.400' 
              fontSize='sm' 
              fontWeight='normal'>
              {publisher}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td
        w='180px'
        minW='150px'
        border={lastItem && 'none'}
        borderBottomColor='#56577A'>
        <Flex direction='column'>
          {[0,1,2].map((_,i) => 
            { return platforms[i] ? (
              <Text 
                key={i} 
                fontSize='sm' 
                fontWeight='normal'
                color={i === 0 ? '#FFF' : 'gray.400'}> 
                {platforms[i].label} {i===2 && '...'}
              </Text>
              ) : null
            }
          )}
        </Flex>
      </Td>

      <Td
        w='160px'
        minW='90px'
        border={lastItem && 'none'}
        borderBottomColor='#56577A'>
        <Flex direction='column'>
          {[0,1,2].map((_,i) => 
              { return genres[i] ? (
                <Text 
                  key={i} 
                  fontSize='sm' 
                  fontWeight='normal'
                  color={i === 0 ? '#FFF' : 'gray.400'}>
                  {genres[i].label} {i===2 && '...'}
                </Text>
                ) : null
              }
            )}
        </Flex>
      </Td>

      <Td 
        w='100px'
        minW='80px'
        border={lastItem && 'none'}
        borderBottomColor='#56577A'>
        <Flex justifyContent='center'>
          <Badge
            p='3px 10px'
            color= '#FFF'
            fontSize='sm'
            fontWeight='normal'
            bg='transparent'
            border='1px solid #fff'
            borderRadius='8px'>
            {rating}
          </Badge>
        </Flex>
      </Td>

      <Td         
        w='130px'
        minW='80px'
        border={lastItem && 'none'}
        borderBottomColor='#56577A'>
        <Flex justifyContent='center'>
          <Badge
            p='3px 10px'
            color= '#FFF'
            fontSize='sm'
            fontWeight='normal'
            bg='transparent'
            border='1px solid #fff'
            borderRadius='8px'>
            {metacritic}
          </Badge>
        </Flex>
      </Td>

      <Td 
        w='170px'
        minW='135px'
        border={lastItem && 'none'}
        borderBottomColor='#56577A'>
        <Text
          color='#fff'
          fontSize='sm'
          fontWeight='normal'>
          {released}
        </Text>
      </Td>

      <Td
        w='250px'
        minW='135px'
        border={lastItem && 'none'}
        borderBottomColor='#56577A'>
        <Text
          color='#fff'
          fontSize='sm'
          fontWeight='normal'>
          {adaptToUpdateDate(updatedAt)}
        </Text>
      </Td>

      <Td 
        w='150px'
        minW='80px'
        border={lastItem && 'none'}
        borderBottomColor='#56577A'>
        <ActionsMenu id={id} deleteDialogHandler={deleteDialogHandler}/>
      </Td>
    </Tr>
  );
}

export default memo(GamesTableRow);
