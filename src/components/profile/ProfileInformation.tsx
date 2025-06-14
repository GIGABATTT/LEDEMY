
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useProfile } from '../../hooks/useProfile';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from '../ui/use-toast';

interface ProfileInformationProps {
  onBackToDashboard: () => void;
}

export const ProfileInformation: React.FC<ProfileInformationProps> = ({ onBackToDashboard }) => {
  const { profile, loading, updateProfile } = useProfile();
  const { user, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    name: '',
    age: '',
    pathology: '',
    emergency_contact: '',
    address: '',
    blood_type: '',
    allergies: '',
    health_plan: '',
  });

  useEffect(() => {
    if (profile) {
      setEditValues({
        name: profile.name || '',
        age: profile.age || '',
        pathology: profile.pathology || '',
        emergency_contact: profile.emergency_contact || '',
        address: profile.address || '',
        blood_type: profile.blood_type || '',
        allergies: profile.allergies || '',
        health_plan: profile.health_plan || '',
      });
    }
  }, [profile]);

  const handleSave = async () => {
    const { error } = await updateProfile(editValues);
    
    if (error) {
      toast({
        title: "Erro",
        description: "Não foi possível salvar as informações.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Informações atualizadas com sucesso!"
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setEditValues({
        name: profile.name || '',
        age: profile.age || '',
        pathology: profile.pathology || '',
        emergency_contact: profile.emergency_contact || '',
        address: profile.address || '',
        blood_type: profile.blood_type || '',
        allergies: profile.allergies || '',
        health_plan: profile.health_plan || '',
      });
    }
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    if (confirm('Tem certeza que deseja sair?')) {
      await signOut();
    }
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

  if (loading) {
    return (
      <div className="w-full max-w-[412px] mx-auto min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Carregando perfil...</div>
      </div>
    );
  }

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
              {user?.email || <span className="text-gray-400 italic">E-mail não informado</span>}
            </div>
          </div>

          {renderField('Nome', editValues.name, 'name', 'Informe seu nome completo')}
          {renderField('Idade', editValues.age, 'age', 'Informe sua idade')}
          {renderField('Patologia', editValues.pathology, 'pathology', 'Informe patologias conhecidas')}
          {renderField('Contato de emergência', editValues.emergency_contact, 'emergency_contact', 'Informe um contato de emergência')}
          {renderField('Endereço', editValues.address, 'address', 'Informe seu endereço completo')}
          {renderField('Tipo sanguíneo', editValues.blood_type, 'blood_type', 'Ex: O+, A-, B+, AB-')}
          {renderField('Alergias', editValues.allergies, 'allergies', 'Informe alergias conhecidas')}
          {renderField('Plano de saúde', editValues.health_plan, 'health_plan', 'Informe seu plano de saúde')}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Tipo de plano
            </label>
            <div className="w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 min-h-[40px] flex items-center">
              <span className="text-gray-600">Básico</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full text-red-600 border-red-300 hover:bg-red-50"
            >
              Sair da Conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
