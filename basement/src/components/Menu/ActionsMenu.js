import { Flex, Menu, MenuButton, MenuItem, MenuList, Text, Icon } from '@chakra-ui/react';
import { memo, useCallback } from 'react'
import { FaEllipsisVertical, FaPencil, FaPhotoFilm, FaTrashCan } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';


const ActionsMenu = ({ id, deleteDialogHandler }) => {
  const navigate = useNavigate();

  const NaigateToEdit = useCallback(() => {
    navigate(`${id}/edit`);
  },[id]);
  
  return (
    <Menu>
      <MenuButton ml='20px'>
        <Icon 
          color='gray.400' 
          cursor='pointer'
          as={FaEllipsisVertical} 
        />   
      </MenuButton>
      <MenuList
        bg='linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.69) 76.65%)'
        border='transparent'
        borderRadius='20px'
        backdropFilter='blur(63px)'>

        <Flex flexDirection='column'>
          <MenuItem
            bg='inherit'
            borderRadius='8px'
            _hover={{ bg: 'brand.400' }}
            _focus={{ bg: 'brand.400' }}
            _active={{ bg: 'brand.400' }}> 

            <Flex p='12px' justifyContent='center' color='green.500' cursor='pointer'>
              <Icon as={FaPhotoFilm} me='4px' w='14px' h='14px' />
              <Text fontSize='xs'>
                Preview
              </Text>
            </Flex>   

          </MenuItem>
          <MenuItem
            bg='inherit'
            borderRadius='8px'
            _hover={{ bg: 'brand.400' }}
            _focus={{ bg: 'brand.400' }}
            _active={{ bg: 'brand.400' }}
            onClick={() => NaigateToEdit()}>

            <Flex p='12px' align='center' cursor='pointer'>
              <Icon as={FaPencil} w='14px' h='14px' me='4px'/>
              <Text fontSize='xs' color='gray.400'>
                Edit
              </Text>
            </Flex>

          </MenuItem>
          <MenuItem
            bg='inherit'
            borderRadius='8px'
            _hover={{ bg: 'brand.400' }}
            _focus={{ bg: 'brand.400' }}
            _active={{ bg: 'brand.400' }}
            onClick={deleteDialogHandler}>

            <Flex p='12px' align='center' color='red.500' cursor='pointer'>
              <Icon as={FaTrashCan} w='14px' h='14px' me='4px'/>
              <Text fontSize='xs'>
                Delete
              </Text>
            </Flex> 
          
          </MenuItem>
        </Flex>
      </MenuList>
    </Menu>
  )
}

export default memo(ActionsMenu);