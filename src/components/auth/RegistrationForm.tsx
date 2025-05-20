import React from 'react';
import { FormInput } from '../ui/FormInput';
import { ActionButton } from '../ui/ActionButton';
import { LinkText } from '../ui/LinkText';
import { AppLogo } from '../ui/AppLogo';

interface RegistrationFormProps {
  onBack: () => void;
  onContinue: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onBack, onContinue }) => {
  return (
    <div className="w-full max-w-[412px] mx-auto">
      <div>
        <div className="cursor-pointer" onClick={onBack}>
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
        
        <form>
          <FormInput 
            type="text" 
            placeholder="Nome" 
          />
          <FormInput 
            type="text" 
            placeholder="Idade" 
          />
          <FormInput 
            type="text" 
            placeholder="Patologia (opicional)" 
          />
          <FormInput 
            type="text" 
            placeholder="Contato de emergência" 
          />
          <FormInput 
            type="text" 
            placeholder="Endereço" 
          />
        </form>
        
        <div className="flex flex-col items-center mx-0 my-5">
          <LinkText href="#">Afinal, oque é a ledemy?</LinkText>
          <LinkText href="#">Termos de serviço</LinkText>
        </div>
        
        <ActionButton onClick={onContinue}>
          Continuar
        </ActionButton>
      </div>
    </div>
  );
};
