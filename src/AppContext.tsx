import {User} from '@supabase/supabase-js';
import React, {createContext, useState, useContext, ReactNode} from 'react';

type AppContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  places: Record<string, any>; // Ensure places is typed correctly
  placeIds: string[]; // Ensure placeIds is typed correctly
  setPlaces: (placesData: any) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [places, setPlacesState] = useState<Record<string, any>>({}); // Initialize as an empty object
  const [placeIds, setPlaceIdsState] = useState<string[]>([]); // Initialize as an empty array

  const setPlaces = (placesData: any) => {
    setPlacesState(placesData.entities.places || {});
    setPlaceIdsState(placesData.result || []);
  };

  return (
    <AppContext.Provider value={{user, setUser, places, placeIds, setPlaces}}>
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
