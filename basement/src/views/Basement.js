import { useContext } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { AdminContext } from '../store/AdminContext';

const drawerWidth = 240;

export default function BasementLayout(){
  const location = useLocation();
  const { signoutAdmin } = useContext(AdminContext);

  return (
   <div>
    <h1>BASEMENT</h1>
    <Outlet/>
   </div>
  );
};