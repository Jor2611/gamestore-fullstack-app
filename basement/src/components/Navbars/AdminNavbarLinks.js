import React from "react"
import { BellIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
} from "@chakra-ui/react";
// Assets
import avatar3 from "../../assets/img/avatars/avatar3.png";

import { ProfileIcon } from "../Icons/Icons";
// Custom Components
import { ItemContent } from "../Menu/ItemContent";
import { SidebarResponsive } from "../Sidebar/SidebarResponsive";
import PropTypes from "prop-types";

export default function HeaderLinks({ logoText }) {
  let navbarIconColor = "white";

  return (
    <Flex
      pe={{ sm: "0px", md: "16px" }}
      w={{ sm: '150px', md: "65px" }}
      alignItems='center'
      justifyContent='space-between'
      flexDirection='row'
    >
      <SidebarResponsive
        iconColor={navbarIconColor}
        logoText={logoText}
      />
      <Menu>
        <MenuButton align='center'>
          <BellIcon color={navbarIconColor} mt='-4px' w='18px' h='18px' />
        </MenuButton>

        <MenuList
          border='transparent'
          backdropFilter='blur(63px)'
          bg='linear-gradient(127.09deg, rgba(6, 11, 40, 0.94) 19.41%, rgba(10, 14, 35, 0.69) 76.65%)'
          borderRadius='20px'>
          <Flex flexDirection='column'>
            <MenuItem
              borderRadius='8px'
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
              _focus={{ bg: "transparent" }}
            >
              <ItemContent
                time='3 days ago'
                info='Payment succesfully completed!'
                boldInfo=''
                aName='Kara'
                aSrc={avatar3}
              />
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton align='center' onClick={() => { alert('EXIT') }}>
          <Tooltip label="Exit Profile" hasArrow placement="bottom" aria-label='A tooltip'>
            <ArrowForwardIcon color={navbarIconColor} mt='-4px' w='18px' h='18px' />
          </Tooltip>
        </MenuButton>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
