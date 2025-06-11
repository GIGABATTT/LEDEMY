
import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { Button } from '../ui/button';

interface ProfileInformationProps {
  onBackToDashboard: () => void;
}

export const ProfileInformation: React.FC<ProfileInformationProps> = ({ onBackToDashboard }) => {
  const {
    userEmail,
    userPassword,
    userName,
    userAge,
    userPathology,
    userEmergencyContact,
    userAddress,
    userBloodType,
    userAllergies,
    userHealthPlan,
    setUserName,
    setUserAge,
    setUserPathology,
    setUserEmergencyContact,
    setUserAddress,
    setUserBloodType,
    setUserAllergies,
    setUserHealthPlan,
  } = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    name: userName,
    age: userAge,
    pathology: userPathology,
    emergencyContact: userEmergencyContact,
    address: userAddress,
    bloodType: userBloodType,
    allergies: userAllergies,
    healthPlan: userHealthPlan,
  });

  const handleSave = () => {
    setUserName(editValues.name);
    setUserAge(editValues.age);
    setUserPathology(editValues.pathology);
    setUserEmergencyContact(editValues.emergencyContact);
    setUserAddress(editValues.address);
    setUserBloodType(editValues.bloodType);
    setUserAllergies(editValues.allergies);
    setUserHealthPlan(editValues.healthPlan);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValues({
      name: userName,
      age: userAge,
      pathology: userPathology,
      emergencyContact: userEmergencyContact,
      address: userAddress,
      bloodType: userBloodType,
      allergies: userAllergies,
      healthPlan: userHealthPlan,
    });
    setIsEditing(false);
  };

  const renderField = (label: string, value: string, fieldKey: keyof typeof editValues, placeholder: string) => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      {isEditing ? (
        <input
          type="text"
          value={editValues[fieldKey]}
          onChange={(e) => setEditValues(prev => ({ ...prev, [fieldKey]: e.target.value }))}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      ) : (
        <div className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 min-h-[40px] flex items-center">
          {value || <span className="text-gray-400 italic">{placeholder}</span>}
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-[412px] mx-auto min-h-screen bg-gray-100">
      <header className="w-full h-[66px] flex justify-between items-center bg-[#007] px-5 py-0">
        <div>
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onBackToDashboard}
          >
            <path d="M19 12H5M12 19L5 12L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="text-white text-lg font-semibold">
          Informações do Perfil
        </div>
        <div className="w-6"></div>
      </header>
      
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Dados Pessoais</h2>
            {!isEditing ? (
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Editar
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="px-3 py-1 text-sm"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm"
                >
                  Salvar
                </Button>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              E-mail
            </label>
            <div className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 min-h-[40px] flex items-center">
              {userEmail || <span className="text-gray-400 italic">E-mail não informado</span>}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Senha
            </label>
            <div className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 min-h-[40px] flex items-center">
              {userPassword ? '•'.repeat(8) : <span className="text-gray-400 italic">Senha não informada</span>}
            </div>
          </div>

          {renderField('Nome', userName, 'name', 'Informe seu nome completo')}
          {renderField('Idade', userAge, 'age', 'Informe sua idade')}
          {renderField('Patologia', userPathology, 'pathology', 'Informe patologias conhecidas')}
          {renderField('Contato de emergência', userEmergencyContact, 'emergencyContact', 'Informe um contato de emergência')}
          {renderField('Endereço', userAddress, 'address', 'Informe seu endereço completo')}
          {renderField('Tipo sanguíneo', userBloodType, 'bloodType', 'Ex: O+, A-, B+, AB-')}
          {renderField('Alergias', userAllergies, 'allergies', 'Informe alergias conhecidas')}
          {renderField('Plano de saúde', userHealthPlan, 'healthPlan', 'Informe seu plano de saúde')}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tipo de plano
            </label>
            <div className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 min-h-[40px] flex items-center">
              <span className="text-gray-600">Básico</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
