
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ActionButton } from '../ui/ActionButton';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';

interface ReminderFormProps {
  onBack: () => void;
  onBackToDashboard: () => void;
  onAddReminder: (reminder: any) => void;
}

export const ReminderForm: React.FC<ReminderFormProps> = ({ onBack, onBackToDashboard, onAddReminder }) => {
  const { t } = useLanguage();
  const [reminderName, setReminderName] = useState('');
  const [reminderType, setReminderType] = useState('');
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [dose, setDose] = useState('');
  const [time, setTime] = useState('');
  const [sound, setSound] = useState('');

  const reminderTypes = [
    { value: 'medicine', label: t.medicine },
    { value: 'appointment', label: t.medicalAppointment },
    { value: 'exercise', label: t.physicalExercise }
  ];

  const daysOfWeek = [
    { value: 'sunday', label: t.sunday, short: 'Dom' },
    { value: 'monday', label: t.monday, short: 'Seg' },
    { value: 'tuesday', label: t.tuesday, short: 'Ter' },
    { value: 'wednesday', label: t.wednesday, short: 'Qua' },
    { value: 'thursday', label: t.thursday, short: 'Qui' },
    { value: 'friday', label: t.friday, short: 'Sex' },
    { value: 'saturday', label: t.saturday, short: 'Sáb' }
  ];

  const soundOptions = [
    { value: 'default', label: 'Padrão' },
    { value: 'bell', label: 'Sino' },
    { value: 'chime', label: 'Carrilhão' },
    { value: 'alarm', label: 'Alarme' },
    { value: 'notification', label: 'Notificação' }
  ];

  const handleDayToggle = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleCreateReminder = () => {
    const newReminder = {
      id: Date.now().toString(),
      name: reminderName,
      type: reminderTypes.find(type => type.value === reminderType)?.label || reminderType,
      days: selectedDays,
      dose: reminderType === 'medicine' ? dose : undefined,
      time,
      sound
    };
    
    console.log('Criando lembrete:', newReminder);
    onAddReminder(newReminder);
  };

  return (
    <div className="w-full max-w-[412px] mx-auto min-h-screen bg-white">
      <header className="w-full h-[66px] flex justify-between items-center bg-[#007] px-5 py-0">
        <div>
          <svg 
            width="37" 
            height="37" 
            viewBox="0 0 37 37" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="back-icon cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onBack}
          >
            <path d="M18.5 6.16667L10.0833 14.5833H30.8333V20.4167H10.0833L18.5 28.8333L14.5 32.8333L0 18.5L14.5 4.16667L18.5 6.16667Z" 
            fill="white"
            />
          </svg>
        </div>
        <div className="text-white text-xl font-bold">
          {t.newReminder}
        </div>
        <div></div>
      </header>
      
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="space-y-6">
            {/* Nome do lembrete */}
            <div className="space-y-2">
              <Label htmlFor="reminderName" className="text-[#007] font-semibold">
                Nome do lembrete
              </Label>
              <Input
                id="reminderName"
                type="text"
                placeholder="Ex: Tomar vitamina D"
                value={reminderName}
                onChange={(e) => setReminderName(e.target.value)}
                className="w-full"
              />
            </div>

            {/* Tipo de lembrete */}
            <div className="space-y-2">
              <Label htmlFor="reminderType" className="text-[#007] font-semibold">
                {t.reminderType}
              </Label>
              <Select value={reminderType} onValueChange={setReminderType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t.selectReminderType} />
                </SelectTrigger>
                <SelectContent>
                  {reminderTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Som do lembrete */}
            <div className="space-y-2">
              <Label htmlFor="sound" className="text-[#007] font-semibold">
                Som do lembrete
              </Label>
              <Select value={sound} onValueChange={setSound}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Escolha o som" />
                </SelectTrigger>
                <SelectContent>
                  {soundOptions.map((soundOption) => (
                    <SelectItem key={soundOption.value} value={soundOption.value}>
                      {soundOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Dias da semana */}
            <div className="space-y-3">
              <Label className="text-[#007] font-semibold">
                {t.daysOfWeek}
              </Label>
              <div className="grid grid-cols-7 gap-2">
                {daysOfWeek.map((day) => (
                  <div 
                    key={day.value} 
                    className={`flex flex-col items-center p-2 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                      selectedDays.includes(day.value) 
                        ? 'border-[#007] bg-[#007] text-white' 
                        : 'border-gray-300 bg-white text-gray-700 hover:border-[#007] hover:bg-blue-50'
                    }`}
                    onClick={() => handleDayToggle(day.value)}
                  >
                    <span className="text-xs font-medium">{day.short}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dose do remédio (apenas se for remédio) */}
            {reminderType === 'medicine' && (
              <div className="space-y-2">
                <Label htmlFor="dose" className="text-[#007] font-semibold">
                  {t.medicineDose} <span className="text-gray-500">({t.optional})</span>
                </Label>
                <Input
                  id="dose"
                  type="text"
                  placeholder={t.dosePlaceholder}
                  value={dose}
                  onChange={(e) => setDose(e.target.value)}
                  className="w-full"
                />
              </div>
            )}

            {/* Horário */}
            <div className="space-y-2">
              <Label htmlFor="time" className="text-[#007] font-semibold">
                {t.time}
              </Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Botão de criar lembrete */}
        <div className="flex flex-col items-center">
          <ActionButton 
            onClick={handleCreateReminder}
            disabled={!reminderName || !reminderType || selectedDays.length === 0 || !time || !sound}
          >
            {t.createReminder}
          </ActionButton>
        </div>
      </div>
    </div>
  );
};
