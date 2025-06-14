
import React from 'react';
import { ActionButton } from '../ui/ActionButton';
import { AppLogo } from '../ui/AppLogo';
import { LanguageSelector } from '../ui/LanguageSelector';
import { useLanguage } from '../../contexts/LanguageContext';

interface WelcomeScreenProps {
  onRegister: () => void;
  onLogin: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onRegister, onLogin }) => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-[412px] mx-auto flex flex-col items-center relative">
      {/* Language selector in top right corner */}
      <div className="absolute top-0 right-0">
        <LanguageSelector />
      </div>
      
      <div className="w-full flex flex-col items-center mt-12">
        <AppLogo className="mx-0 my-10" />
        
        <div className="flex flex-col items-center gap-5 mt-10">
          <ActionButton onClick={onRegister}>
            Registrar nova conta
          </ActionButton>
          
          <ActionButton onClick={onLogin}>
            Já tem uma conta? Fazer login
          </ActionButton>
        </div>
      </div>
    </div>
  );
};
