
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ActionButton } from '../ui/ActionButton';
import { ReminderForm } from './ReminderForm';
import { Plus } from 'lucide-react';

interface SymptomsSearchProps {
  onBackToDashboard: () => void;
}

interface Reminder {
  id: string;
  name: string;
  type: string;
  time: string;
  days: string[];
  dose?: string;
  sound: string;
}

export const SymptomsSearch: React.FC<SymptomsSearchProps> = ({ onBackToDashboard }) => {
  const { t } = useLanguage();
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  const handleAddReminder = (reminder: Reminder) => {
    setReminders(prev => [...prev, reminder]);
    setShowReminderForm(false);
  };

  if (showReminderForm) {
    return (
      <ReminderForm 
        onBack={() => setShowReminderForm(false)}
        onBackToDashboard={onBackToDashboard}
        onAddReminder={handleAddReminder}
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
          className="w-full bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center gap-4 cursor-pointer hover:shadow-lg transition-all duration-300 hover:bg-gray-50 hover:scale-[1.02] group"
          onClick={() => setShowReminderForm(true)}
        >
          <div className="flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Plus className="w-6 h-6 text-[#007]" />
          </div>
          <span className="text-[#007] text-lg font-medium">
            {t.newReminder}
          </span>
        </div>

        {/* Lista de lembretes criados */}
        {reminders.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="text-[#007] text-lg font-semibold mb-4">Lembretes criados</h3>
            {reminders.map((reminder) => (
              <div key={reminder.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-[#007] font-semibold text-lg">{reminder.name}</h4>
                    <p className="text-gray-600 text-sm">{reminder.type}</p>
                    <p className="text-gray-800 font-medium">{reminder.time}</p>
                    <p className="text-gray-500 text-sm">
                      {reminder.days.map(day => t[day as keyof typeof t]).join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
