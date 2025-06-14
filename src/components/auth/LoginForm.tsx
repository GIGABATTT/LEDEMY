
import React, { useState } from 'react';
import { FormInput } from '../ui/FormInput';
import { ActionButton } from '../ui/ActionButton';
import { LinkText } from '../ui/LinkText';
import { AppLogo } from '../ui/AppLogo';
import { LanguageSelector } from '../ui/LanguageSelector';
import { useUser } from '../../contexts/UserContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  onRegister: () => void;
  onLoginSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onRegister, onLoginSuccess }) => {
  const { t } = useLanguage();
  const { userEmail, userPassword, setUserEmail, setUserPassword } = useUser();
  const [localEmail, setLocalEmail] = useState(userEmail);
  const [localPassword, setLocalPassword] = useState(userPassword);
  const [showPassword, setShowPassword] = useState(false);

  const handleLoginClick = () => {
    // Salva os dados de login
    setUserEmail(localEmail);
    setUserPassword(localPassword);
    console.log('Login data saved:', { email: localEmail, password: localPassword });
    
    // Verifica se as credenciais existem (usuário já registrado)
    if (localEmail && localPassword) {
      console.log('Login successful, redirecting to dashboard');
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    }
  };

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
          <div className="relative w-full max-w-sm">
            <FormInput 
              type={showPassword ? "text" : "password"}
              placeholder={t.passwordPlaceholder}
              value={localPassword}
              onChange={(e) => setLocalPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </form>
        
        <div className="flex flex-col items-center mx-0 my-5">
          <LinkText href="#">{t.forgotPassword}</LinkText>
          <LinkText href="#">{t.termsOfService}</LinkText>
        </div>
        
        <ActionButton onClick={handleLoginClick}>
          Fazer Login
        </ActionButton>
        
        <div className="mt-4">
          <LinkText href="#" onClick={handleRegisterClick}>
            Não tem uma conta? Registrar-se
          </LinkText>
        </div>
      </div>
    </div>
  );
};
