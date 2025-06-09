
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ActionButton } from '../ui/ActionButton';
import { ReminderForm } from './ReminderForm';
import { Plus } from 'lucide-react';

interface SymptomsSearchProps {
  onBackToDashboard: () => void;
}

export const SymptomsSearch: React.FC<SymptomsSearchProps> = ({ onBackToDashboard }) => {
  const { t } = useLanguage();
  const [showReminderForm, setShowReminderForm] = useState(false);

  if (showReminderForm) {
    return (
      <ReminderForm 
        onBack={() => setShowReminderForm(false)}
        onBackToDashboard={onBackToDashboard}
      />
    );
  }

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
          {t.configureReminders}
        </div>
        <div></div>
      </header>
      
      <div className="p-6">
        <div 
          className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all duration-300 hover:bg-gray-50"
          onClick={() => setShowReminderForm(true)}
        >
          <div className="w-8 h-8 bg-[#007] rounded-full flex items-center justify-center">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <span className="text-[#007] text-lg font-medium">
            {t.newReminder}
          </span>
        </div>
        
        <div className="mt-8 flex justify-center">
          <ActionButton 
            onClick={onBackToDashboard}
          >
            {t.returnToMenu}
          </ActionButton>
        </div>
      </div>
    </div>
  );
};
