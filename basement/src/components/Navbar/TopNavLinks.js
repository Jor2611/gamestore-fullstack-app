import { ArrowForwardIcon, BellIcon } from '@chakra-ui/icons'
import { Flex, Menu, MenuButton, MenuItem, MenuList, Tooltip } from '@chakra-ui/react'
import { ItemContent } from '../Menu/ItemContent'
import SidebarResponsive from '../Sidebar/SidebarResponsive'
import avatar1 from "../../assets/img/avatars/avatar1.png";

export const TopNavLinks = ({ signOut }) => {
  return (
    <Flex
      w={{ sm: '110px', lg: '75px' }}
      alignItems='center'
      flexDirection='row'
      justifyContent='space-between'
    >
      <SidebarResponsive iconColor={'#FFF'} logoText={'PLAYON BASEMENT'}/>
      <Menu>
        <Tooltip label='Notifications' hasArrow fontSize='smaller'>
          <MenuButton>
            <BellIcon color='#FFF' w='25px' h='25px' me='0px'/>
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
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
              _focus={{ bg: "transparent" }}
              mb='10px'>
              <ItemContent
                time='13 minutes ago'
                info='from Alicia'
                boldInfo='New Message'
                aName='Alicia'
                aSrc={avatar1}
              />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
      <Menu>
        <Tooltip label={'Logout'} hasArrow fontSize='smaller'>
          <MenuButton onClick={() => { signOut() }}>
            <ArrowForwardIcon color='#FFF' w='25px' h='25px' me='0px'/>
          </MenuButton>
        </Tooltip>
      </Menu>
    </Flex>
  )
}
