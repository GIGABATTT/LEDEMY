
import React, { useState } from 'react';
import { FormInput } from '../ui/FormInput';
import { ActionButton } from '../ui/ActionButton';
import { LinkText } from '../ui/LinkText';
import { AppLogo } from '../ui/AppLogo';
import { useUser } from '../../contexts/UserContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Eye, EyeOff } from 'lucide-react';

interface RegistrationFormProps {
  onBack: () => void;
  onContinue: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onBack, onContinue }) => {
  const { t } = useLanguage();
  const { 
    userName, userAge, userEmail, userPassword,
    setUserName, setUserAge, setUserEmail, setUserPassword 
  } = useUser();
  
  const [localName, setLocalName] = useState(userName);
  const [localAge, setLocalAge] = useState(userAge);
  const [localEmail, setLocalEmail] = useState(userEmail);
  const [localPassword, setLocalPassword] = useState(userPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setLocalName(newName);
    
    // Easter egg check
    if (newName.toLowerCase() === "let me be a hero") {
      setShowEasterEgg(true);
      setTimeout(() => setShowEasterEgg(false), 4000);
    }
  };

  const handleContinue = () => {
    // Validate all fields are filled
    if (!localName || !localAge || !localEmail || !localPassword) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Save the registration data
    setUserName(localName);
    setUserAge(localAge);
    setUserEmail(localEmail);
    setUserPassword(localPassword);
    
    console.log('Registration data saved:', { 
      name: localName, 
      age: localAge, 
      email: localEmail,
      password: localPassword 
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
            placeholder="Nome completo"
            value={localName}
            onChange={handleNameChange}
            required
          />
          <FormInput 
            type="text" 
            placeholder="Idade"
            value={localAge}
            onChange={(e) => setLocalAge(e.target.value)}
            required
          />
          <FormInput 
            type="email" 
            placeholder="E-mail"
            value={localEmail}
            onChange={(e) => setLocalEmail(e.target.value)}
            showEmailSuggestions={true}
            required
          />
          <div className="relative w-full max-w-sm">
            <FormInput 
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={localPassword}
              onChange={(e) => setLocalPassword(e.target.value)}
              required
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
          <LinkText href="#">{t.whatIsLedemy}</LinkText>
          <LinkText href="#">{t.termsOfService}</LinkText>
        </div>
        
        <ActionButton onClick={handleContinue}>
          Cadastrar
        </ActionButton>
      </div>

      {/* Easter Egg Popup Super Divertido */}
      {showEasterEgg && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500 p-8 rounded-3xl shadow-2xl transform animate-bounce border-4 border-yellow-400 relative overflow-hidden">
            {/* Efeito de brilho */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-pulse"></div>
            
            {/* Explosão de confetes */}
            <div className="absolute -top-4 -left-4 text-yellow-300 animate-spin text-6xl">🎉</div>
            <div className="absolute -top-4 -right-4 text-red-300 animate-bounce text-5xl">✨</div>
            <div className="absolute -bottom-4 -left-4 text-blue-300 animate-pulse text-4xl">💫</div>
            <div className="absolute -bottom-4 -right-4 text-green-300 animate-bounce text-6xl">🎊</div>
            
            <div className="text-center relative z-10">
              <div className="text-8xl mb-4 animate-bounce">🦸‍♂️</div>
              <div className="text-4xl font-black text-white mb-4 animate-pulse drop-shadow-lg">
                vsf KKKKKKK
              </div>
              <div className="text-xl text-white font-bold bg-black/30 px-4 py-2 rounded-full animate-pulse">
                🎯 Easter egg encontrado! 🎯
              </div>
              <div className="text-lg text-yellow-100 mt-2 animate-bounce">
                Você é realmente um herói! 🌟
              </div>
            </div>
            
            {/* Partículas flutuantes */}
            <div className="absolute top-1/4 left-1/4 text-3xl animate-ping">⭐</div>
            <div className="absolute top-3/4 right-1/4 text-2xl animate-bounce delay-300">🚀</div>
            <div className="absolute top-1/2 left-1/6 text-4xl animate-pulse delay-500">💪</div>
            <div className="absolute top-1/3 right-1/6 text-3xl animate-spin delay-700">🎭</div>
          </div>
        </div>
      )}
    </div>
  );
};
