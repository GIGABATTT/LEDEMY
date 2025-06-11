
import React from 'react';
import { ActionButton } from '../ui/ActionButton';
import { LinkText } from '../ui/LinkText';
import { PlanCard } from '../ui/PlanCard';
import { useLanguage } from '../../contexts/LanguageContext';

interface PlanSelectionProps {
  onClose: () => void;
  onSelectPremium: () => void;
  onSelectFamily: () => void;
  onSkip: () => void;
}

export const PlanSelection: React.FC<PlanSelectionProps> = ({ onClose, onSelectPremium, onSelectFamily, onSkip }) => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-[412px] mx-auto flex flex-col items-center min-h-screen justify-center px-4">
      <div className="w-full flex flex-col items-center bg-gradient-to-b from-transparent to-black/10 rounded-2xl p-6 backdrop-blur-sm">
        <div className="self-start cursor-pointer mb-8 hover:scale-110 transition-transform duration-200" onClick={onClose}>
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
        
        <div className="text-white text-[36px] font-bold text-center mb-12 max-sm:text-2xl leading-tight">
          {t.improveExperience} <br />
          <span className="text-purple-300">{t.experience}</span>?
        </div>
        
        <div className="flex justify-center gap-6 mb-12 max-sm:flex-col max-sm:items-center max-sm:gap-4">
          <div className="transform hover:scale-105 transition-all duration-500 hover:shadow-2xl animate-fade-in hover:rotate-1" style={{ animationDelay: '0.2s' }}>
            <PlanCard
              title={t.premiumPlan}
              price="11"
              cents="90"
              description={t.individual}
              onClick={onSelectPremium}
            />
          </div>
          
          <div className="transform hover:scale-105 transition-all duration-500 hover:shadow-2xl animate-fade-in hover:-rotate-1" style={{ animationDelay: '0.4s' }}>
            <PlanCard
              title={t.familyPlan}
              price="19"
              cents="90"
              description={t.upToThreePeople}
              onClick={onSelectFamily}
            />
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <LinkText href="#" onClick={onSkip} className="text-center block text-white/80 hover:text-white transition-colors">
            {t.maybeLater}
          </LinkText>
        </div>
      </div>
    </div>
  );
};
