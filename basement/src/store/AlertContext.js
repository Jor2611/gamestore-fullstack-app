import { createContext, useState } from 'react';
import { responseMap } from '../utils/responseMap';

export const AlertContext = createContext();

export default function AlertContextProvider({ children }){
  const [alert, setAlert] = useState({ color: 'blue.600', message: '' });

  const showAlert = (message) => {
    const responseAlert = responseMap.get(message);
    setAlert(prevState => (responseAlert ? {...responseAlert} : { ...prevState, message }));
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
