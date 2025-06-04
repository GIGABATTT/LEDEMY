
import React, { useState } from 'react';
import { FormInput } from '../ui/FormInput';
import { ActionButton } from '../ui/ActionButton';
import { LinkText } from '../ui/LinkText';
import { AppLogo } from '../ui/AppLogo';
import { useUser } from '../../contexts/UserContext';

interface MedicalInfoFormProps {
  onBack: () => void;
  onContinue: () => void;
  onSkip: () => void;
}

export const MedicalInfoForm: React.FC<MedicalInfoFormProps> = ({ onBack, onContinue, onSkip }) => {
  const { 
    userBloodType, userAllergies, userHealthPlan,
    setUserBloodType, setUserAllergies, setUserHealthPlan 
  } = useUser();
  
  const [localBloodType, setLocalBloodType] = useState(userBloodType);
  const [localAllergies, setLocalAllergies] = useState(userAllergies);
  const [localHealthPlan, setLocalHealthPlan] = useState(userHealthPlan);

  const handleContinue = () => {
    setUserBloodType(localBloodType);
    setUserAllergies(localAllergies);
    setUserHealthPlan(localHealthPlan);
    console.log('Medical info saved:', { 
      bloodType: localBloodType, 
      allergies: localAllergies, 
      healthPlan: localHealthPlan 
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
            placeholder="Tipo sanguíneo" 
            value={localBloodType}
            onChange={(e) => setLocalBloodType(e.target.value)}
          />
          <FormInput 
            type="text" 
            placeholder="Alergias" 
            value={localAllergies}
            onChange={(e) => setLocalAllergies(e.target.value)}
          />
          <FormInput 
            type="text" 
            placeholder="Plano de saúde (opicional)" 
            value={localHealthPlan}
            onChange={(e) => setLocalHealthPlan(e.target.value)}
          />
        </form>
        
        <div className="flex flex-col items-center">
          <ActionButton onClick={handleContinue}>
            Continuar
          </ActionButton>
          
          <LinkText href="#" onClick={onSkip} className="text-center block">
            Preencher depois
          </LinkText>
        </div>
      </div>
    </div>
  );
};
