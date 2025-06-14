
import React, { useState } from 'react';
import { FormInput } from '../ui/FormInput';
import { ActionButton } from '../ui/ActionButton';
import { AppLogo } from '../ui/AppLogo';
import { useUser } from '../../contexts/UserContext';
import { Eye, EyeOff } from 'lucide-react';

interface SimpleLoginFormProps {
  onBack: () => void;
  onLoginSuccess: () => void;
}

export const SimpleLoginForm: React.FC<SimpleLoginFormProps> = ({ onBack, onLoginSuccess }) => {
  const { userEmail, userPassword } = useUser();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Check if fields are filled
    if (!loginEmail || !loginPassword) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Check if credentials match registered user
    if (loginEmail === userEmail && loginPassword === userPassword) {
      console.log('Login successful for:', loginEmail);
      onLoginSuccess();
    } else {
      alert('E-mail ou senha incorretos. Verifique suas credenciais ou registre uma nova conta.');
    }
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
            type="email" 
            placeholder="E-mail"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            showEmailSuggestions={true}
          />
          <div className="relative w-full max-w-sm">
            <FormInput 
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
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
        
        <ActionButton onClick={handleLogin}>
          Entrar
        </ActionButton>
      </div>
    </div>
  );
};
