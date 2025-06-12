
import React from 'react';
import { ArrowLeft, Clock, Search, MapPin, Phone } from 'lucide-react';

interface HelpScreenProps {
  onBack: () => void;
}

export const HelpScreen: React.FC<HelpScreenProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-[412px] mx-auto h-screen bg-white overflow-y-auto">
      {/* Header */}
      <header className="w-full h-[66px] flex justify-between items-center bg-[#007] px-5 py-0">
        <div>
          <ArrowLeft 
            className="w-6 h-6 text-white cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onBack}
          />
        </div>
        <h1 className="text-white text-lg font-semibold">Ajuda</h1>
        <div className="w-6"></div>
      </header>

      {/* Content */}
      <div className="p-5 space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#01015E] mb-2">Como usar o aplicativo</h2>
          <p className="text-gray-600">Guia completo das principais funcionalidades</p>
        </div>

        {/* Configurar Lembretes */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-[#01015E]">Configurar Lembretes</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Esta função permite criar, editar e excluir lembretes personalizados para ajudar a manter sua rotina de cuidados. 
            Você pode configurar lembretes para tomar medicamentos, fazer exercícios, consultas médicas ou qualquer atividade 
            importante relacionada à sua saúde.
          </p>
        </div>

        {/* Pesquisar Sintomas */}
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Search className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-[#01015E]">Pesquisar Sintomas</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Você pode pesquisar sintomas que está sentindo e o aplicativo mostrará possíveis doenças associadas junto com 
            recomendações simples. <strong className="text-red-600">Importante:</strong> As informações são apenas orientativas 
            e sempre recomendamos procurar um profissional de saúde qualificado para diagnóstico e tratamento adequado.
          </p>
        </div>

        {/* Farmácias por Perto */}
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-[#01015E]">Farmácias por Perto</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            O aplicativo localiza farmácias próximas à sua localização, facilitando o acesso rápido a medicamentos e produtos 
            de saúde. Você pode ver informações como horário de funcionamento, contato e se a farmácia está aberta no momento.
          </p>
        </div>

        {/* Contatos de Emergência */}
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-red-100 p-2 rounded-lg">
              <Phone className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-[#01015E]">Contatos de Emergência</h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Esta função permite visualizar e ligar rapidamente para contatos de emergência cadastrados. É essencial para 
            garantir ajuda rápida em situações críticas. Você pode adicionar familiares, médicos, hospitais e outros 
            contatos importantes.
          </p>
        </div>

        {/* Dicas Gerais */}
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 mt-6">
          <h3 className="text-lg font-semibold text-[#01015E] mb-3">💡 Dicas Importantes</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 font-bold">•</span>
              <span>Mantenha sempre seus contatos de emergência atualizados</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 font-bold">•</span>
              <span>Configure lembretes com antecedência para não esquecer</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 font-bold">•</span>
              <span>Use a pesquisa de sintomas como apoio, mas sempre consulte um médico</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 font-bold">•</span>
              <span>Permita o acesso à localização para encontrar farmácias próximas</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
