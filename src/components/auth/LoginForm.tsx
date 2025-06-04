
import React, { useState } from 'react';
import { FormInput } from '../ui/FormInput';
import { ActionButton } from '../ui/ActionButton';
import { LinkText } from '../ui/LinkText';
import { AppLogo } from '../ui/AppLogo';
import { LanguageSelector } from '../ui/LanguageSelector';
import { useUser } from '../../contexts/UserContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface LoginFormProps {
  onRegister: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onRegister }) => {
  const { t } = useLanguage();
  const { userEmail, userPassword, setUserEmail, setUserPassword } = useUser();
  const [localEmail, setLocalEmail] = useState(userEmail);
  const [localPassword, setLocalPassword] = useState(userPassword);

  const handleRegisterClick = () => {
    setUserEmail(localEmail);
    setUserPassword(localPassword);
    console.log('Login data saved:', { email: localEmail, password: localPassword });
    onRegister();
  };

  return (
    <div className="w-full max-w-[412px] mx-auto flex flex-col items-center relative">
      {/* Language selector in top right corner */}
      <div className="absolute top-0 right-0">
        <LanguageSelector />
      </div>
      
      <div className="w-full flex flex-col items-center mt-12">
        <AppLogo className="mx-0 my-10" />
        
        <form className="w-full flex flex-col items-center">
          <FormInput 
            type="email" 
            placeholder={t.emailPlaceholder}
            value={localEmail}
            onChange={(e) => setLocalEmail(e.target.value)}
            showEmailSuggestions={true}
          />
          <FormInput 
            type="password" 
            placeholder={t.passwordPlaceholder}
            value={localPassword}
            onChange={(e) => setLocalPassword(e.target.value)}
          />
        </form>
        
        <div className="flex flex-col items-center mx-0 my-5">
          <LinkText href="#">{t.forgotPassword}</LinkText>
          <LinkText href="#">{t.termsOfService}</LinkText>
        </div>
        
        <ActionButton onClick={handleRegisterClick}>
          {t.registerButton}
        </ActionButton>
      </div>
    </div>
  );
};
