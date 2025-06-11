
import React from 'react';
import { ActionButton } from '../ui/ActionButton';
import { LinkText } from '../ui/LinkText';
import { useLanguage } from '../../contexts/LanguageContext';

interface PremiumPaymentProps {
  onBack: () => void;
  onSwitchToFamily: () => void;
  onPaymentComplete: () => void;
}

export const PremiumPayment: React.FC<PremiumPaymentProps> = ({ onBack, onSwitchToFamily, onPaymentComplete }) => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-[412px] mx-auto flex flex-col items-center min-h-screen justify-center px-4">
      <div className="w-full flex flex-col items-center bg-gradient-to-b from-transparent to-black/10 rounded-2xl p-6 backdrop-blur-sm">
        <div className="self-start cursor-pointer mb-8 hover:scale-110 transition-transform duration-200" onClick={onBack}>
          <svg 
            width="31" 
            height="31" 
            viewBox="0 0 31 31" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="close-icon hover:opacity-80 transition-opacity"
          >
            <g clipPath="url(#clip0_20_88)">
              <path d="M3.1 31L0 27.9L12.4 15.5L0 3.1L3.1 0L15.5 12.4L27.9 0L31 3.1L18.6 15.5L31 27.9L27.9 31L15.5 18.6L3.1 31Z" 
              fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_20_88">
                <rect width="31" height="31" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        
        <div className="text-white text-[36px] font-bold text-center mb-8 max-sm:text-2xl leading-tight">
          {t.premiumPlan}
        </div>
        
        <div className="w-full max-w-[300px] bg-white rounded-[15px] p-6 mb-8 text-center">
          <h2 className="text-[#010177] text-[32px] font-bold mb-4">{t.premiumPlan}</h2>
          <div className="text-[#007] text-[32px] font-bold mb-6">
            <span>11,</span>
            <span className="text-2xl">90</span>
            <span>/mês</span>
          </div>
          <div className="text-[#010177] text-xl font-medium mb-6">•{t.individual}</div>
          
          <div className="space-y-4 text-left text-gray-700">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Acesso completo a todas as funcionalidades</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Pesquisa avançada de sintomas</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Lembretes ilimitados</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Suporte prioritário</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-4 w-full">
          <ActionButton onClick={onPaymentComplete}>
            Confirmar Pagamento
          </ActionButton>
          
          <LinkText href="#" onClick={onSwitchToFamily} className="text-center block text-white/80 hover:text-white transition-colors">
            Trocar para Plano Familiar
          </LinkText>
        </div>
      </div>
    </div>
  );
};
