
import React, { useState } from 'react';
import { FormInput } from '../ui/FormInput';
import { ActionButton } from '../ui/ActionButton';
import { LinkText } from '../ui/LinkText';
import { AppLogo } from '../ui/AppLogo';
import { useUser } from '../../contexts/UserContext';

interface RegistrationFormProps {
  onBack: () => void;
  onContinue: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onBack, onContinue }) => {
  const { 
    userName, userAge, userPathology, userEmergencyContact, userAddress,
    setUserName, setUserAge, setUserPathology, setUserEmergencyContact, setUserAddress 
  } = useUser();
  
  const [localName, setLocalName] = useState(userName);
  const [localAge, setLocalAge] = useState(userAge);
  const [localPathology, setLocalPathology] = useState(userPathology);
  const [localEmergencyContact, setLocalEmergencyContact] = useState(userEmergencyContact);
  const [localAddress, setLocalAddress] = useState(userAddress);

  const handleContinue = () => {
    setUserName(localName);
    setUserAge(localAge);
    setUserPathology(localPathology);
    setUserEmergencyContact(localEmergencyContact);
    setUserAddress(localAddress);
    console.log('Registration data saved:', { 
      name: localName, 
      age: localAge, 
      pathology: localPathology, 
      emergencyContact: localEmergencyContact, 
      address: localAddress 
    });
    onContinue();
  };

  return (
    <div className="w-full max-w-[412px] mx-auto flex flex-col items-center">
      <div className="w-full flex flex-col items-center">
        <div className="self-start cursor-pointer" onClick={onBack}>
          <svg 
            width="38" 
            height="38" 
            viewBox="0 0 38 38" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="back-arrow"
          >
            <path d="M12.3896 20.5833L21.2563 29.45L19 31.6667L6.33337 19L19 6.33334L21.2563 8.55L12.3896 17.4167H31.6667V20.5833H12.3896Z" 
            fill="white"
            />
          </svg>
        </div>
        
        <AppLogo className="mx-0 my-10" />
        
        <form className="w-full flex flex-col items-center">
          <FormInput 
            type="text" 
            placeholder="Nome" 
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
          />
          <FormInput 
            type="text" 
            placeholder="Idade" 
            value={localAge}
            onChange={(e) => setLocalAge(e.target.value)}
          />
          <FormInput 
            type="text" 
            placeholder="Patologia (opicional)" 
            value={localPathology}
            onChange={(e) => setLocalPathology(e.target.value)}
          />
          <FormInput 
            type="text" 
            placeholder="Contato de emergência" 
            value={localEmergencyContact}
            onChange={(e) => setLocalEmergencyContact(e.target.value)}
          />
          <FormInput 
            type="text" 
            placeholder="Endereço" 
            value={localAddress}
            onChange={(e) => setLocalAddress(e.target.value)}
          />
        </form>
        
        <div className="flex flex-col items-center mx-0 my-5">
          <LinkText href="#">Afinal, oque é a ledemy?</LinkText>
          <LinkText href="#">Termos de serviço</LinkText>
        </div>
        
        <ActionButton onClick={handleContinue}>
          Continuar
        </ActionButton>
      </div>
    </div>
  );
};
