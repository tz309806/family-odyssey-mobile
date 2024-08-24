import {User} from '@supabase/supabase-js';
import React, {createContext, useState, useContext, ReactNode} from 'react';

type AppContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  // add more global state properties as needed
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AppContext.Provider value={{user, setUser}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
