import { useLocation } from "react-router-dom";
import { Box, Stack } from "@chakra-ui/react";
import PropTypes from "prop-types";
import Brand from "./Brand";
import SidebarNavButton from "./SidebarNavButton";
import routes from "../../navs";

function Sidebar({ logoText }) {
  let location = useLocation();
  let sidebarBg = "linear-gradient(111.84deg, rgba(6, 11, 38, 0.94) 59.3%, rgba(26, 31, 55, 0) 100%)";

  const isActiveRoute = (routeName) => ( location.pathname === routeName || `/${location.pathname.split('/')[1]}` === routeName );

  return (
    <Box>
      <Box display={{ xs: "none", md:'none', lg: "block" }} position='fixed'>
        <Box
          bg={sidebarBg}
          backdropFilter='blur(10px)'
          transition="0.2s linear"
          w='260px'
          maxW='260px'
          ms={{ xs: "16px" }}
          my={{ xs: "16px" }}
          h='calc(100vh - 32px)'
          ps='20px'
          pe='20px'
          m="16px 0px 16px 16px"
          borderRadius="16px">
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
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string,
};

export default Sidebar;
