import { useContext, useEffect, useState } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { AdminContext } from './store/AdminContext';
import { eventEmitter } from './utils/eventEmitter';
import BasementLayout from './views/Basement';
import LoginForm from './views/LoginForm';
import Games from './views/Games/Games';

export default function AppNavigation() {
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  const { isAuthenticated: isAdminAuth, authenticateAdmin, signoutAdmin } = useContext(AdminContext);

  useEffect(() => {
    const adminToken = localStorage.getItem('admin_token');
  },[]);

  return (
    <Routes>
      <Route path='' element={ isAdminAuth ? <BasementLayout/> : <LoginForm/> }>
        {isAdminAuth && <Route path='games' element={<Games/>}/>}
        <Route path='*' element={<Navigate to='/basement' replace/>}/>
      </Route>
    </Routes>
  );
}