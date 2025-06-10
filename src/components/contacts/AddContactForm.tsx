
import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, Image } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface Contact {
  name: string;
  phone: string;
  relationship: string;
  photo?: string;
}

interface AddContactFormProps {
  onSave: (contact: Contact) => void;
  onCancel: () => void;
}

export const AddContactForm: React.FC<AddContactFormProps> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState<Contact>({
    name: '',
    phone: '',
    relationship: '',
    photo: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof Contact, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({ ...prev, photo: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.phone.trim() && formData.relationship.trim()) {
      onSave(formData);
    }
  };

  const isFormValid = formData.name.trim() && formData.phone.trim() && formData.relationship.trim();

  return (
    <div className="w-full max-w-[412px] mx-auto bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="w-full h-[66px] flex justify-between items-center bg-[#007] px-5 py-0">
        <div>
          <ArrowLeft 
            size={32} 
            color="white" 
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onCancel}
          />
        </div>
        <h1 className="text-white text-lg font-medium">Adicionar Contato</h1>
        <div className="w-8" /> {/* Spacer */}
      </header>

      {/* Form */}
      <div className="p-5">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden mb-3">
              {formData.photo ? (
                <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 text-3xl">👤</span>
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Image size={16} />
              Adicionar Foto
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>

          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 font-medium">Nome completo</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Digite o nome completo"
              className="bg-white"
            />
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-700 font-medium">Número de telefone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="(xx) xxxxx-xxxx"
              className="bg-white"
            />
          </div>

          {/* Relationship Field */}
          <div className="space-y-2">
            <Label htmlFor="relationship" className="text-gray-700 font-medium">Grau de parentesco</Label>
            <Input
              id="relationship"
              type="text"
              value={formData.relationship}
              onChange={(e) => handleInputChange('relationship', e.target.value)}
              placeholder="Ex: Mãe, Irmão, Tio, Amigo"
              className="bg-white"
            />
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={!isFormValid}
              className="w-full bg-[#007] hover:bg-[#006] text-white py-3 text-lg font-medium"
            >
              Salvar Contato
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
