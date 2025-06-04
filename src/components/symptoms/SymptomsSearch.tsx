
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ActionButton } from '../ui/ActionButton';

interface SymptomsSearchProps {
  onBackToDashboard: () => void;
}

export const SymptomsSearch: React.FC<SymptomsSearchProps> = ({ onBackToDashboard }) => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-[412px] mx-auto">
      <header className="w-full h-[66px] flex justify-between items-center bg-[#007] px-5 py-0">
        <div>
          <svg 
            width="37" 
            height="37" 
            viewBox="0 0 37 37" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="back-icon cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onBackToDashboard}
          >
            <path d="M18.5 6.16667L10.0833 14.5833H30.8333V20.4167H10.0833L18.5 28.8333L14.5 32.8333L0 18.5L14.5 4.16667L18.5 6.16667Z" 
            fill="white"
            />
          </svg>
        </div>
        <div className="text-white text-xl font-bold">
          Pesquisar Sintomas
        </div>
        <div></div>
      </header>
      
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-8">
        <div className="text-center mb-8">
          <h1 className="text-white text-[28px] font-bold mb-4">
            Pesquisa de Sintomas
          </h1>
          <p className="text-white text-lg opacity-80">
            Área em desenvolvimento
          </p>
        </div>
        
        <div className="w-[300px] h-[200px] bg-white bg-opacity-20 rounded-[15px] flex flex-col items-center justify-center border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300 cursor-pointer">
          <div className="text-6xl mb-4 animate-bounce">
            ➕
          </div>
          <span className="text-white text-xl font-medium">
            Criar lembrete
          </span>
        </div>
        
        <ActionButton 
          onClick={onBackToDashboard}
          className="mt-8"
        >
          Retornar ao Menu
        </ActionButton>
      </div>
    </div>
  );
};
