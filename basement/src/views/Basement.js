import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, ChakraProvider, useToast } from '@chakra-ui/react';
import { AdminContext } from '../store/AdminContext';
import theme from '../theme/themeAdmin';
import Sidebar from '../components/Sidebar/Sidebar';
import TopNavbar from '../components/Navbar/TopNavbar';
import MainPanel from '../components/Layout/MainPanel';
import PanelContainer from '../components/Layout/PanelContainer';
import { AlertContext } from '../store/AlertContext';

export default function BasementLayout(){
  const { signoutAdmin } = useContext(AdminContext);
  const { alert } = useContext(AlertContext);

  const toast = useToast();

  useEffect(() => {
    if(alert.message){
      toast({
        position:'top-right',
        duration: 3000,
        render:() => (
          <Box color='white' mt={10} mr={10} p={3} bg={alert.color}>
            {alert.message}
          </Box>
        )
      })
    }
  }, [alert]);
  
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Sidebar logoText={'PLAYON BASEMENT'}/>
          <MainPanel w={{ base: "100%", lg: "calc(100% - 275px)" }}>
            <TopNavbar signOut={signoutAdmin}/>
            <PanelContainer >
              <Outlet/>
            </PanelContainer>
          </MainPanel>
      </Box>
    </ChakraProvider>
  );
};