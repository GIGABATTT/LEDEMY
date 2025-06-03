import React from 'react';
import { FormInput } from '../ui/FormInput';
import { ActionButton } from '../ui/ActionButton';
import { LinkText } from '../ui/LinkText';
import { AppLogo } from '../ui/AppLogo';

interface MedicalInfoFormProps {
  onBack: () => void;
  onContinue: () => void;
  onSkip: () => void;
}

export const MedicalInfoForm: React.FC<MedicalInfoFormProps> = ({ onBack, onContinue, onSkip }) => {
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
          />
          <FormInput 
            type="text" 
            placeholder="Alergias" 
          />
          <FormInput 
            type="text" 
            placeholder="Plano de saúde (opicional)" 
          />
        </form>
        
        <div className="flex flex-col items-center">
          <ActionButton onClick={onContinue}>
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
