
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SymptomsSearchMainProps {
  onBackToDashboard: () => void;
  onDescribeSymptoms: () => void;
  onDescribeDisease: () => void;
}

export const SymptomsSearchMain: React.FC<SymptomsSearchMainProps> = ({ 
  onBackToDashboard, 
  onDescribeSymptoms, 
  onDescribeDisease 
}) => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-[412px] mx-auto min-h-screen bg-gray-100">
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
          Pesquisar sintomas
        </div>
        <div>
          <svg 
            width="35" 
            height="52" 
            viewBox="0 0 35 52" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="menu-icon cursor-pointer hover:opacity-80 transition-opacity"
          >
            <path d="M4.375 38.7182V34.4214H30.625V38.7182H4.375ZM4.375 27.9762V23.6793H30.625V27.9762H4.375ZM4.375 17.2341V12.9372H30.625V17.2341H4.375Z" 
            fill="white"
            />
          </svg>
        </div>
      </header>
      
      <div className="p-6 space-y-4 mt-8">
        <div 
          className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex items-center gap-4 cursor-pointer hover:shadow-xl transition-all duration-300 hover:bg-gray-50 hover:scale-[1.02] group"
          onClick={onDescribeDisease}
        >
          <div className="flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" fill="#007"/>
              <path d="M12 6c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z" fill="#007"/>
              <circle cx="12" cy="12" r="2" fill="#007"/>
            </svg>
          </div>
          <span className="text-[#007] text-lg font-medium">
            Descreva sua doença
          </span>
        </div>

        <div 
          className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex items-center gap-4 cursor-pointer hover:shadow-xl transition-all duration-300 hover:bg-gray-50 hover:scale-[1.02] group"
          onClick={onDescribeSymptoms}
        >
          <div className="flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C17.523 2 22 6.477 22 12s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2C7.589 4 4 7.589 4 12s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8z" fill="#007"/>
              <circle cx="8" cy="12" r="1.5" fill="#007"/>
              <circle cx="12" cy="8" r="1.5" fill="#007"/>
              <circle cx="16" cy="12" r="1.5" fill="#007"/>
              <circle cx="12" cy="16" r="1.5" fill="#007"/>
            </svg>
          </div>
          <span className="text-[#007] text-lg font-medium">
            Descreva seus sintomas
          </span>
        </div>
      </div>
    </div>
  );
};
