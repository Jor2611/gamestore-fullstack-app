import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex, Link } from '@chakra-ui/react'
import React from 'react'
import { TopNavLinks } from './TopNavLinks'

const TopNavbar = ({ signOut }) => {
  return (
    <Flex
      position={'absolute'}
      borderColor='transparent'
      borderWidth='1.5px'
      borderStyle='solid'
      transitionDelay='0s, 0s, 0s, 0s'
      transitionDuration='0.25s, 0.25s, 0.25s, 0s'
      transitionTimingFunction='linear, linear, linear, linear'
      alignItems={{ xl: 'center' }}
      borderRadius='16px'
      display='flex'
      minH='75px'
      justifyContent={{ xl: 'center' }}
      lineHeight='25.6px'
      mx='auto'
      mt={'0px'}
      pb='8px'
      left='0'
      right='10px'
      px={{ sm: '10px', md: '30px' }}
      ps={{ lg: '12px' }}
      pt='8px'
      top='18px'
      w={{ sm: "calc(100vw - 20px)", lg: "calc(100vw - 35px - 275px)" }}
    >
      <Flex
        w='100%'
        flexDirection={"row"}
        alignItems={"center"}
        justifyContent={{ md:"space-between"}}
      >
        <Box mb={{ sm: '8px', md: '0px' }}>
          <Breadcrumb>
            <BreadcrumbItem color='#A0AEC0'>
              <BreadcrumbLink href='#' color='#A0AEC0'>
                #
              </BreadcrumbLink>
            </BreadcrumbItem>
          <BreadcrumbItem color={'#FFF'}>
            <BreadcrumbLink href='#' color={'#FFF'}>
              PlayOn
            </BreadcrumbLink>
          </BreadcrumbItem>
          </Breadcrumb>
          <Link
            color='#FFF'
            href='#'
            bg='inherit'
            borderRadius='inherit'
            fontWeight='bold'
            _hover={{ color: '#FFF' }}
            _active={{
              bg:'inherit',
              transform: 'none',
              borderColor: 'transparent'
            }}
            _focus={{ boxShadow: 'none' }}
          >
            PlayOn
          </Link>
        </Box>
        <Box ms='auto' >
          <TopNavLinks signOut={signOut}/>
        </Box>
      </Flex>
    </Flex>
  )
}

export default TopNavbar