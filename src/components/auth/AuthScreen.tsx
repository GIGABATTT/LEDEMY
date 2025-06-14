
import React, { useState } from 'react';
import { FormInput } from '../ui/FormInput';
import { ActionButton } from '../ui/ActionButton';
import { AppLogo } from '../ui/AppLogo';
import { LanguageSelector } from '../ui/LanguageSelector';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from '../ui/use-toast';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { signUp, signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = isLogin 
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        toast({
          title: "Erro",
          description: error.message,
          variant: "destructive"
        });
      } else {
        if (isLogin) {
          toast({
            title: "Sucesso",
            description: "Login realizado com sucesso!"
          });
          onAuthSuccess();
        } else {
          toast({
            title: "Conta criada",
            description: "Verifique seu e-mail para confirmar a conta."
          });
        }
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[412px] mx-auto flex flex-col items-center relative">
      <div className="absolute top-0 right-0">
        <LanguageSelector />
      </div>
      
      <div className="w-full flex flex-col items-center mt-12">
        <AppLogo className="mx-0 my-10" />
        
        <div className="w-full max-w-sm mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                !isLogin 
                  ? 'bg-white text-[#007] shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Criar Conta
            </button>
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                isLogin 
                  ? 'bg-white text-[#007] shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Fazer Login
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          <FormInput 
            type="email" 
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            showEmailSuggestions={true}
          />
          
          <div className="relative w-full max-w-sm">
            <FormInput 
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <ActionButton 
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (isLogin ? 'Entrando...' : 'Criando...') : (isLogin ? 'Entrar' : 'Criar Conta')}
          </ActionButton>
        </form>
      </div>
    </div>
  );
};
