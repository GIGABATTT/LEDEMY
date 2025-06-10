
import React, { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

interface DescribeSymptomsProps {
  onBack: () => void;
  onBackToDashboard: () => void;
}

export const DescribeSymptoms: React.FC<DescribeSymptomsProps> = ({ onBack, onBackToDashboard }) => {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleAnalyze = () => {
    const lowerSymptoms = symptoms.toLowerCase();
    
    if (lowerSymptoms.includes('dor de cabeça') || lowerSymptoms.includes('náusea') || lowerSymptoms.includes('sensibilidade a luz') || lowerSymptoms.includes('sensibilidade à luz')) {
      setResult('Com base nos sintomas descritos, você pode estar com ENXAQUECA. Os principais sintomas da enxaqueca incluem: dor de cabeça intensa, sensibilidade à luz e náuseas.');
    } else if (lowerSymptoms.includes('febre') || lowerSymptoms.includes('tosse') || lowerSymptoms.includes('coriza')) {
      setResult('Com base nos sintomas descritos, você pode estar com GRIPE ou RESFRIADO.');
    } else {
      setResult('Não foi possível identificar uma condição específica com os sintomas descritos. Recomendamos consultar um médico para uma avaliação adequada.');
    }
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
            onClick={onBack}
          >
            <path d="M18.5 6.16667L10.0833 14.5833H30.8333V20.4167H10.0833L18.5 28.8333L14.5 32.8333L0 18.5L14.5 4.16667L18.5 6.16667Z" 
            fill="white"
            />
          </svg>
        </div>
        <div className="text-white text-xl font-bold">
          Descreva seus sintomas
        </div>
        <div></div>
      </header>
      
      <div className="p-6 space-y-6">
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

        {result && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h4 className="text-[#007] font-bold text-lg mb-3">Resultado da análise:</h4>
            <p className="text-gray-700 leading-relaxed">{result}</p>
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
