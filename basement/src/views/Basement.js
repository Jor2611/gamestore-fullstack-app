import { useContext, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, ChakraProvider, Hide } from '@chakra-ui/react';
import { loadGenres, loadPlatforms } from '../api/layoutApi';
import { LayoutContext } from '../store/LayoutContext';
import { AdminContext } from '../store/AdminContext';
import theme from '../theme/themeAdmin';
import Sidebar from '../components/Sidebar/Sidebar';
import TopNavbar from '../components/Navbar/TopNavbar';
import MainPanel from '../components/Layout/MainPanel';
import PanelContainer from '../components/Layout/PanelContainer';


export default function BasementLayout(){
  const { signoutAdmin } = useContext(AdminContext);
  const { loadLayoutData } = useContext(LayoutContext);

  useEffect(() => {
    async function fetchLayoutData(){
      try{
        const genresResponse = await loadGenres();
        const platformsResponse = await loadPlatforms();
        loadLayoutData({ genres: genresResponse.data, platforms: platformsResponse.data });
      }catch(err){
        console.log(err);
      }
    }

    fetchLayoutData();
  },[]);

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Hide below='lg'>
          <Sidebar logoText={'PLAYON BASEMENT'}/>
        </Hide>
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