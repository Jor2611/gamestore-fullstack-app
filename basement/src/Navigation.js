import { useContext, useEffect, useState } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { CircularProgress, Box } from '@chakra-ui/react'
import { AdminContext } from './store/AdminContext';
import { eventEmitter } from './utils/eventEmitter';
import { checkToken } from './utils/http';
import BasementLayout from './views/Basement';
import LoginForm from './views/LoginForm';
import Games from './views/Games/Games';


export default function AppNavigation() {
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const { isAuthenticated: isAdminAuth, authenticateAdmin, signoutAdmin } = useContext(AdminContext);

  useEffect(() => {
    const adminToken = localStorage.getItem('admin_token');

    async function checkAuthState(token){
      try{
        const { id } = await checkToken(token);
        authenticateAdmin({ id, token })
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
        {isAdminAuth && <Route path='orders' element={<Games/>}/>}
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