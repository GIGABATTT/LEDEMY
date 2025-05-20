import React from 'react';
import { ActionButton } from '../ui/ActionButton';
import { LinkText } from '../ui/LinkText';
import { PlanCard } from '../ui/PlanCard';

interface PlanSelectionProps {
  onClose: () => void;
  onSelectPlan: () => void;
  onSkip: () => void;
}

export const PlanSelection: React.FC<PlanSelectionProps> = ({ onClose, onSelectPlan, onSkip }) => {
  return (
    <div className="w-full max-w-[412px] mx-auto">
      <div>
        <div className="cursor-pointer" onClick={onClose}>
          <svg 
            width="31" 
            height="31" 
            viewBox="0 0 31 31" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="close-icon"
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
        
        <div className="text-white text-[32px] text-center mx-5 my-10 max-sm:text-2xl">
          Gostaria de melhorar sua experiencia?
        </div>
        
        <div className="flex justify-around mx-0 my-5">
          <PlanCard
            title="PREMIUM"
            price="11"
            cents="90"
            description="Individual"
          />
          
          <PlanCard
            title="FAMILIAR"
            price="19"
            cents="90"
            description="Até 3 pessoas"
          />
        </div>
        
        <div className="flex flex-col items-center">
          <ActionButton onClick={onSelectPlan}>
            Escolher plano
          </ActionButton>
          
          <LinkText href="#" onClick={onSkip} className="text-center block">
            Talvez depois
          </LinkText>
        </div>
      </div>
    </div>
  );
};
