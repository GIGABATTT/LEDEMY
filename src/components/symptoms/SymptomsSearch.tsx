
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ReminderForm } from './ReminderForm';
import { Plus, Clock, Calendar, Volume2, Trash2 } from 'lucide-react';
import { useReminders } from '../../hooks/useReminders';
import { toast } from '../ui/use-toast';

interface SymptomsSearchProps {
  onBackToDashboard: () => void;
}

export const SymptomsSearch: React.FC<SymptomsSearchProps> = ({ onBackToDashboard }) => {
  const { t } = useLanguage();
  const [showReminderForm, setShowReminderForm] = useState(false);
  const { reminders, loading, addReminder, deleteReminder } = useReminders();

  const handleAddReminder = async (reminder: any) => {
    const { error } = await addReminder({
      title: reminder.name,
      description: reminder.type,
      time: reminder.time,
      frequency: reminder.days.join(','),
      is_active: true
    });

    if (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o lembrete.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Lembrete adicionado com sucesso!"
      });
      setShowReminderForm(false);
    }
  };

  const handleDeleteReminder = async (reminderId: string) => {
    if (confirm('Tem certeza que deseja excluir este lembrete?')) {
      const { error } = await deleteReminder(reminderId);
      
      if (error) {
        toast({
          title: "Erro",
          description: "Não foi possível excluir o lembrete.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Sucesso",
          description: "Lembrete excluído com sucesso!"
        });
      }
    }
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
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="text-gray-500">Carregando lembretes...</div>
          </div>
        ) : reminders.length > 0 && (
          <div className="mt-6 space-y-4">
            <h3 className="text-[#007] text-xl font-bold mb-6">Lembretes criados</h3>
            {reminders.map((reminder) => (
              <div key={reminder.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-[#007] font-bold text-xl mb-2">{reminder.title}</h4>
                    
                    {reminder.description && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-blue-50 px-3 py-1 rounded-full">
                          <span className="text-[#007] text-sm font-medium">{reminder.description}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock className="w-4 h-4 text-[#007]" />
                        <span className="font-semibold text-lg">{reminder.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4 text-[#007]" />
                        <span className="text-sm">{reminder.frequency}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <Volume2 className="w-4 h-4 text-[#007]" />
                        <span className="text-sm capitalize">Padrão</span>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDeleteReminder(reminder.id)}
                    className="bg-red-500 hover:bg-red-600 rounded-full p-2 transition-colors ml-4"
                  >
                    <Trash2 size={16} color="white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
