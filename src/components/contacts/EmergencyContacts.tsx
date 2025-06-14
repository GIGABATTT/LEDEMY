
import React, { useState } from 'react';
import { ArrowLeft, Menu, Plus, Phone, Trash2 } from 'lucide-react';
import { AddContactForm } from './AddContactForm';
import { useEmergencyContacts } from '../../hooks/useEmergencyContacts';
import { toast } from '../ui/use-toast';

interface EmergencyContactsProps {
  onBackToDashboard: () => void;
}

export const EmergencyContacts: React.FC<EmergencyContactsProps> = ({ onBackToDashboard }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const { contacts, loading, addContact, deleteContact } = useEmergencyContacts();

  const handleAddContact = async (contact: any) => {
    const { error } = await addContact(contact);
    
    if (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o contato.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Contato adicionado com sucesso!"
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    if (confirm('Tem certeza que deseja excluir este contato?')) {
      const { error } = await deleteContact(contactId);
      
      if (error) {
        toast({
          title: "Erro",
          description: "Não foi possível excluir o contato.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Sucesso",
          description: "Contato excluído com sucesso!"
        });
      }
    }
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  if (showAddForm) {
    return (
      <AddContactForm 
        onSave={handleAddContact}
        onCancel={() => setShowAddForm(false)}
      />
    );
  }

  return (
    <div className="w-full max-w-[412px] mx-auto bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="w-full h-[66px] flex justify-between items-center bg-[#007] px-5 py-0">
        <div>
          <ArrowLeft 
            size={32} 
            color="white" 
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onBackToDashboard}
          />
        </div>
        <div>
          <Menu 
            size={32} 
            color="white" 
            className="cursor-pointer hover:opacity-80 transition-opacity"
          />
        </div>
      </header>

      {/* Add Contact Button */}
      <div className="p-5">
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full bg-white rounded-xl shadow-lg p-4 flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
        >
          <Plus size={24} className="text-[#007]" />
          <span className="text-lg font-medium text-gray-800">Adicionar contato</span>
        </button>
      </div>

      {/* Contacts List or Empty State */}
      <div className="px-5 pb-5">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="text-gray-500">Carregando contatos...</div>
          </div>
        ) : contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl text-gray-300 font-bold opacity-50 mb-2">
              LEDEMY
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div key={contact.id} className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center gap-4">
                  {/* Contact Photo */}
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                    {contact.photo ? (
                      <img src={contact.photo} alt={contact.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-500 text-lg">👤</span>
                    )}
                  </div>
                  
                  {/* Contact Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{contact.name}</h3>
                    <p className="text-sm text-gray-600">{contact.relationship}</p>
                    <p className="text-sm text-gray-500">{contact.phone}</p>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCall(contact.phone)}
                      className="bg-green-500 hover:bg-green-600 rounded-full p-3 transition-colors"
                    >
                      <Phone size={16} color="white" />
                    </button>
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="bg-red-500 hover:bg-red-600 rounded-full p-3 transition-colors"
                    >
                      <Trash2 size={16} color="white" />
                    </button>
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
