import { useContext, useEffect, useState } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@chakra-ui/react'
import { AdminContext } from './store/AdminContext';
import { eventEmitter } from './utils/eventEmitter';
import { checkToken, loadGenres, loadPlatforms } from './utils/http';
import { LayoutContext } from './store/LayoutContext';
import BasementLayout from './views/Basement';
import LoginForm from './views/LoginForm';
import Games from './views/Games/Games';
import Orders from './views/Orders/Orders';
import AddGame from './views/Games/AddGame';
import EditGame from './views/Games/EditGame';


export default function AppNavigation() {
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const { isAuthenticated: isAdminAuth, authenticateAdmin, signoutAdmin } = useContext(AdminContext);
  const { loadLayoutData } = useContext(LayoutContext);

  useEffect(() => {
    const adminToken = localStorage.getItem('admin_token');

    async function checkAuthState(token){
      try{
        const { id } = await checkToken(token);
        const genres = await loadGenres();
        const platforms = await loadPlatforms();
        
        authenticateAdmin({ id, token });
        loadLayoutData({ genres, platforms });
      }catch(err){
        console.log(err)
        signoutAdmin();
      }finally{
        setIsAdminLoading(false);
      }
    }

    if(adminToken){
      checkAuthState(adminToken, true);
    } else {
      setIsAdminLoading(false);
    }

    function handleUnauthorized(){
      signoutAdmin();
    }

    eventEmitter.on('unauthorized', handleUnauthorized);

    return () => {
      eventEmitter.removeListener('unauthorized', handleUnauthorized);
    };
    
  },[]);

  if(isAdminLoading){
    return <LoadingScreen height='100vh'/>;
  }

  return (
    <Routes>
      <Route path='' element={ isAdminAuth ? <BasementLayout/> : <LoginForm/> }>
        {isAdminAuth && <Route index element={<Navigate to='/games' replace/>}/>}
        {isAdminAuth && <Route path='games' element={<Games/>}/>}
        {isAdminAuth && <Route path='games/new' element={<AddGame/>}/>}
        {isAdminAuth && <Route path='games/:gameId/edit' element={<EditGame/>}/>}
        {isAdminAuth && <Route path='orders' element={<Orders/>}/>}
        <Route path='*' element={<Navigate to='/games' replace/>}/>
      </Route>
      <Route path='*' element={<Navigate to='/' replace/>}/>
    </Routes>
  );
}

export const LoadingScreen = ({ height }) => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height
  }}>
    <CircularProgress size={55} />
  </Box>
);