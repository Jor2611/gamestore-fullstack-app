import { useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { HamburgerIcon } from "@chakra-ui/icons";
import Brand from "./Brand";
import routes from "../../navs";
import SidebarNavButton from "./SidebarNavButton";


export function SidebarResponsive({ logoText, iconColor }) {
  let location = useLocation();
  const isActiveRoute = (routeName) => ( location.pathname === routeName );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <Flex
      display={{ sm: "flex", lg: "none" }}
      alignItems='center'>
      <HamburgerIcon
        color={iconColor}
        w='25px'
        h='25px'
        ref={btnRef}
        colorscheme='teal'
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={"left"}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent
          backdropFilter='blur(10px)'
          bg='linear-gradient(111.84deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0) 100%); '
          w='250px'
          maxW='250px'
          ms={{ sm: "16px" }}
          my={{ sm: "16px" }}
          borderRadius='16px'>
          <DrawerCloseButton
            color='white'
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW='250px' px='1rem' overflowY={'hidden'}>
            <Box maxW='100%' h='100vh'>
              <Box>
                <Brand logoText={logoText}/>
              </Box>
              <Stack direction='column' mb='40px'>
                <Box>{
                    routes.map((route, i) => (
                      <SidebarNavButton
                        key={i}
                        to={route.to} 
                        label={route.label}
                        icon={route.icon}
                        active={isActiveRoute(route.to)}
                      />
                    ))
                  }</Box>
              </Stack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

SidebarResponsive.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

export default SidebarResponsive;