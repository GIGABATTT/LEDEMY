
import React, { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

interface DescribeSymptomsProps {
  onBack: () => void;
  onBackToDashboard: () => void;
}

interface Disease {
  id: string;
  name: string;
  description: string;
  symptoms: string;
  recommendations: string[];
}

export const DescribeSymptoms: React.FC<DescribeSymptomsProps> = ({ onBack, onBackToDashboard }) => {
  const [symptoms, setSymptoms] = useState('');
  const [possibleDiseases, setPossibleDiseases] = useState<Disease[]>([]);
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [showResults, setShowResults] = useState(false);

  const diseases: Disease[] = [
    {
      id: 'enxaqueca',
      name: 'ENXAQUECA',
      description: 'Com base nos sintomas descritos, você pode estar com ENXAQUECA. Os principais sintomas da enxaqueca incluem: dor de cabeça intensa, sensibilidade à luz e náuseas.',
      symptoms: 'Dor de cabeça intensa e pulsante, sensibilidade à luz (fotofobia), náuseas e vômitos, sensibilidade ao som',
      recommendations: [
        'Descansar em um ambiente escuro e silencioso',
        'Aplicar compressas frias na testa',
        'Beber chá de camomila para relaxar',
        'Fazer massagem suave nas têmporas',
        'Manter-se hidratado'
      ]
    },
    {
      id: 'gripe',
      name: 'GRIPE/RESFRIADO',
      description: 'Com base nos sintomas descritos, você pode estar com GRIPE ou RESFRIADO.',
      symptoms: 'Febre, tosse, coriza, dores no corpo, fadiga, dor de garganta',
      recommendations: [
        'Fazer repouso absoluto',
        'Beber bastante líquido (água, chás, sucos naturais)',
        'Chá de gengibre com mel e limão',
        'Gargarejos com água morna e sal',
        'Inalação de vapor com eucalipto'
      ]
    },
    {
      id: 'gastrite',
      name: 'GASTRITE',
      description: 'Com base nos sintomas descritos, você pode estar com GASTRITE.',
      symptoms: 'Dor no estômago, azia, náuseas, sensação de queimação',
      recommendations: [
        'Evitar alimentos ácidos e condimentados',
        'Fazer refeições menores e mais frequentes',
        'Chá de espinheira-santa',
        'Evitar jejum prolongado',
        'Beber bastante água'
      ]
    }
  ];

  const handleAnalyze = () => {
    const lowerSymptoms = symptoms.toLowerCase();
    const matchedDiseases: Disease[] = [];
    
    if (lowerSymptoms.includes('dor de cabeça') || lowerSymptoms.includes('náusea') || lowerSymptoms.includes('sensibilidade a luz') || lowerSymptoms.includes('sensibilidade à luz')) {
      matchedDiseases.push(diseases[0]); // enxaqueca
    }
    
    if (lowerSymptoms.includes('febre') || lowerSymptoms.includes('tosse') || lowerSymptoms.includes('coriza')) {
      matchedDiseases.push(diseases[1]); // gripe
    }
    
    if (lowerSymptoms.includes('dor no estômago') || lowerSymptoms.includes('azia') || lowerSymptoms.includes('queimação')) {
      matchedDiseases.push(diseases[2]); // gastrite
    }

    if (matchedDiseases.length === 0) {
      // Se não encontrou correspondência, mostra todas as opções
      setPossibleDiseases(diseases);
    } else {
      setPossibleDiseases(matchedDiseases);
    }
    
    setShowResults(true);
  };

  const handleDiseaseClick = (disease: Disease) => {
    setSelectedDisease(disease);
  };

  const handleBackToResults = () => {
    setSelectedDisease(null);
  };

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
            onClick={selectedDisease ? handleBackToResults : onBack}
          >
            <path d="M18.5 6.16667L10.0833 14.5833H30.8333V20.4167H10.0833L18.5 28.8333L14.5 32.8333L0 18.5L14.5 4.16667L18.5 6.16667Z" 
            fill="white"
            />
          </svg>
        </div>
        <div className="text-white text-xl font-bold">
          {selectedDisease ? selectedDisease.name : 'Descreva seus sintomas'}
        </div>
        <div></div>
      </header>
      
      <div className="p-6 space-y-6">
        {!showResults && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-[#007] text-xl font-bold mb-4">Descreva os sintomas que você está sentindo:</h3>
            
            <Textarea
              placeholder="Ex: Estou sentindo dor de cabeça forte, náuseas e sensibilidade à luz..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="min-h-[120px] mb-4"
            />
            
            <Button 
              onClick={handleAnalyze}
              className="w-full bg-[#007] hover:bg-[#005] text-white"
              disabled={!symptoms.trim()}
            >
              Analisar sintomas
            </Button>
          </div>
        )}

        {showResults && !selectedDisease && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-[#007] text-xl font-bold mb-4">Possíveis condições baseadas nos seus sintomas:</h3>
              <p className="text-gray-600 mb-4">Clique em uma das opções abaixo para ver mais detalhes:</p>
            </div>
            
            {possibleDiseases.map((disease) => (
              <div 
                key={disease.id}
                className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-[#007]"
                onClick={() => handleDiseaseClick(disease)}
              >
                <h4 className="text-[#007] font-bold text-lg mb-2">{disease.name}</h4>
                <p className="text-gray-600 text-sm">Clique para ver análise completa e recomendações</p>
              </div>
            ))}
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-800">
                <strong>Importante:</strong> Esta é apenas uma análise preliminar. Consulte sempre um médico para um diagnóstico adequado.
              </p>
            </div>
          </div>
        )}

        {selectedDisease && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h4 className="text-[#007] font-bold text-lg mb-3">Resultado da análise:</h4>
            <p className="text-gray-700 leading-relaxed mb-4">{selectedDisease.description}</p>
            
            <div className="mb-4 p-4 bg-white border border-blue-100 rounded-lg">
              <h5 className="text-[#007] font-bold text-lg mb-3">Principais sintomas:</h5>
              <p className="text-gray-700">{selectedDisease.symptoms}</p>
            </div>
            
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h5 className="text-green-800 font-bold text-lg mb-3">Recomendações de tratamento simples:</h5>
              <ul className="space-y-2">
                {selectedDisease.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2 text-green-700">
                    <span className="text-green-600 mt-1">•</span>
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Importante:</strong> Esta é apenas uma análise preliminar. Consulte sempre um médico para um diagnóstico adequado.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
