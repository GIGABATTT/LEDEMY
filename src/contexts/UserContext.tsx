
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
  userEmail: string;
  userPassword: string;
  userName: string;
  userAge: string;
  userPathology: string;
  userEmergencyContact: string;
  userAddress: string;
  userBloodType: string;
  userAllergies: string;
  userHealthPlan: string;
  setUserEmail: (email: string) => void;
  setUserPassword: (password: string) => void;
  setUserName: (name: string) => void;
  setUserAge: (age: string) => void;
  setUserPathology: (pathology: string) => void;
  setUserEmergencyContact: (contact: string) => void;
  setUserAddress: (address: string) => void;
  setUserBloodType: (bloodType: string) => void;
  setUserAllergies: (allergies: string) => void;
  setUserHealthPlan: (healthPlan: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userPathology, setUserPathology] = useState('');
  const [userEmergencyContact, setUserEmergencyContact] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userBloodType, setUserBloodType] = useState('');
  const [userAllergies, setUserAllergies] = useState('');
  const [userHealthPlan, setUserHealthPlan] = useState('');

  return (
    <UserContext.Provider
      value={{
        userEmail,
        userPassword,
        userName,
        userAge,
        userPathology,
        userEmergencyContact,
        userAddress,
        userBloodType,
        userAllergies,
        userHealthPlan,
        setUserEmail,
        setUserPassword,
        setUserName,
        setUserAge,
        setUserPathology,
        setUserEmergencyContact,
        setUserAddress,
        setUserBloodType,
        setUserAllergies,
        setUserHealthPlan,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
