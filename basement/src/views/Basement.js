import { useContext } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { AdminContext } from '../store/AdminContext';
import theme from '../theme/themeAdmin';
import Sidebar from '../components/Sidebar/Sidebar';
import AdminNavbar from '../components/Navbars/AdminNavbar';

export default function BasementLayout(){
  const location = useLocation();
  const { signoutAdmin } = useContext(AdminContext);

  return (
    <ChakraProvider theme={theme} w='100%'>
      <Box>
        <AdminNavbar brandText={'PLAYON BASEMENT'}/>
        <Sidebar logoText={'PLAYON BASEMENT'}/>
        <Outlet/>
      </Box>
    </ChakraProvider>
  );
};