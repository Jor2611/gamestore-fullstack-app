import { 
  Flex, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  Tooltip, 
  Icon 
} from '@chakra-ui/react';
import { FaBell, FaPersonWalkingArrowRight } from 'react-icons/fa6';
import { ItemContent } from '../Menu/ItemContent';
import SidebarResponsive from '../Sidebar/SidebarResponsive';
import avatar1 from "../../assets/img/avatars/avatar1.png";
import avatar2 from "../../assets/img/avatars/avatar2.png";

export const TopNavLinks = ({ signOut }) => {
  return (
    <Flex
      w={{ xs: '110px', lg: '75px' }}
      alignItems='center'
      flexDirection='row'
      justifyContent='space-between'
    >
      <SidebarResponsive iconColor={'#FFF'} logoText={'PLAYON BASEMENT'}/>
      <Menu>
        <Tooltip label='Notifications' hasArrow fontSize='smaller'>
          <MenuButton>
            <Icon as={FaBell} color='#FFF' w='25px' h='25px' />
          </MenuButton>
        </Tooltip>
        <MenuList
          border='transparent'
          backdropFilter='blur(63px)'
          borderRadius='20px'
          bg='linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.69) 76.65%)'
        >
          <Flex flexDirection='column'>
            <MenuItem
              borderRadius='8px'
              bg='inherit'
              _hover={{ bg: "brand.500" }}
              _active={{ bg: "brand.500" }}
              _focus={{ bg: "brand.500" }}
              mb='10px'>
              <ItemContent
                time='13 minutes ago'
                info='from Alicia'
                boldInfo='New Message'
                aName='Alicia'
                aSrc={avatar1}
              />
            </MenuItem>
            <MenuItem
              borderRadius='8px'
              bg='inherit'
              _hover={{ bg: "brand.500" }}
              _active={{ bg: "brand.500" }}
              _focus={{ bg: "brand.500" }}
              mb='10px'>
              <ItemContent
                time='13 minutes ago'
                info='from Alicia'
                boldInfo='New Message'
                aName='Alicia'
                aSrc={avatar2}
              />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
      <Menu>
        <Tooltip label={'Logout'} hasArrow fontSize='smaller'>
          <MenuButton onClick={() => { signOut() }}>
            <Icon as={FaPersonWalkingArrowRight} color='#FFF' me='0px' w='25px' h='25px' />
          </MenuButton>
        </Tooltip>
      </Menu>
    </Flex>
  )
}
