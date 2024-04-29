import { Button, Flex, Icon, Text } from '@chakra-ui/react'
import { NavLink } from "react-router-dom";
import IconBox from '../Icons/IconBox'

const SidebarNavButton = ({ icon, to, label, active }) => {
  let activeBg = "#1A1F37";
  let inactiveBg = "#1A1F37";
  let activeColor = "white";
  let inactiveColor = "white";
  let sidebarActiveShadow = "none";
  let variantChange = "0.2s linear";

  return (
    <NavLink to={to}>
      <Button
        boxSize='initial'
        justifyContent='flex-start'
        alignItems='center'
        w='100%'
        py='12px'
        borderRadius='15px'
        boxShadow={sidebarActiveShadow}
        bg={active ? activeBg : 'transparent'}
        transition={active ? "0.2s linear" : 'inherit' }//try none as well
        backdropFilter={active ? "blur(42px)" : "inherit" }//try none as well
        mb={{ xl: "12px" }}
        mx={{ xl: "auto" }}
        ps={{ sm: "10px", xl: "16px" }}
        _hover='none'
        _active={{
          bg: "inherit",
          transform: "none",
          borderColor: "transparent",
        }}
        _focus={{
          boxShadow: active ? "0px 7px 11px rgba(0, 0, 0, 0.04)" : "none",
        }}>
        <Flex>
          {typeof icon === "string" ? (
            <Icon>{icon}</Icon>
          ) : (
            <IconBox
              bg={ active ? 'brand.200' : inactiveBg}
              color= { active ? 'white' : 'brand.200' }
              h='30px'
              w='30px'
              me='12px'
              transition={variantChange}>
              {icon}
            </IconBox>
          )}
          <Text 
            color={active ? activeColor : inactiveColor } 
            my='auto' 
            fontSize='sm'
          >
            {label}
          </Text>
        </Flex>
      </Button>
    </NavLink>
  )
}

export default SidebarNavButton