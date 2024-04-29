import React, { createContext, useState } from 'react';

export const AdminContext = createContext({
  id: null,
  isAuthenticated: false,
  token: null,
  authenticateAdmin: (data) => {},
  signoutAdmin: () => {}
});

function AdminContextProvider({ children }) {
  const [adminState, setAdminState] = useState({ id: null, token: null });

  function authenticateAdmin(data) {
    localStorage.setItem('admin_token', data.token);
    localStorage.setItem('admin_id', data.id);
    setAdminState(() => ({ id: data.id, token: data.token }));
  }

  function signoutAdmin(){
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_id');
    setAdminState(() => ({ id: null, token: null }));
  }

  const value = {
    ...adminState,
    isAuthenticated: !!adminState.token,
    authenticateAdmin,
    signoutAdmin
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export default AdminContextProvider;
