
import React, { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

interface DescribeDiseaseProps {
  onBack: () => void;
  onBackToDashboard: () => void;
}

export const DescribeDisease: React.FC<DescribeDiseaseProps> = ({ onBack, onBackToDashboard }) => {
  const [disease, setDisease] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const handleSearch = () => {
    const lowerDisease = disease.toLowerCase();
    
    if (lowerDisease.includes('enxaqueca') || lowerDisease.includes('enxaqueca')) {
      setResult('ENXAQUECA - Os principais sintomas incluem:\n\n• Dor de cabeça intensa e pulsante\n• Sensibilidade à luz (fotofobia)\n• Náuseas e vômitos\n• Sensibilidade ao som\n• Dor geralmente em um lado da cabeça\n• Pode durar de 4 a 72 horas');
      setRecommendations([
        'Descansar em ambiente escuro e silencioso',
        'Aplicar compressas frias na testa',
        'Chá de camomila para relaxamento',
        'Massagem suave nas têmporas',
        'Evitar alimentos que podem ser gatilhos (chocolate, queijos)'
      ]);
    } else if (lowerDisease.includes('gripe')) {
      setResult('GRIPE - Os principais sintomas incluem:\n\n• Febre alta\n• Dores no corpo\n• Tosse seca\n• Dor de garganta\n• Fadiga e fraqueza\n• Dor de cabeça\n• Calafrios');
      setRecommendations([
        'Repouso absoluto',
        'Beber muitos líquidos (água, chás, sucos)',
        'Chá de gengibre com mel e limão',
        'Gargarejos com água morna e sal',
        'Inalação de vapor d\'água'
      ]);
    } else if (lowerDisease.includes('diabetes')) {
      setResult('DIABETES - Os principais sintomas incluem:\n\n• Sede excessiva\n• Urinar frequentemente\n• Fome excessiva\n• Perda de peso sem explicação\n• Fadiga\n• Visão embaçada\n• Cicatrização lenta de feridas');
      setRecommendations([
        'Manter alimentação equilibrada e regular',
        'Praticar exercícios físicos leves (caminhada)',
        'Beber bastante água',
        'Evitar açúcares e carboidratos refinados',
        'Controlar o peso corporal'
      ]);
    } else {
      setResult('Doença não encontrada na nossa base de dados. Consulte um médico para informações mais específicas sobre esta condição.');
      setRecommendations([
        'Manter hábitos saudáveis',
        'Beber bastante água',
        'Praticar exercícios regulares',
        'Ter uma alimentação equilibrada'
      ]);
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
          Descreva sua doença
        </div>
        <div></div>
      </header>
      
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-[#007] text-xl font-bold mb-4">Digite o nome da doença:</h3>
          
          <Textarea
            placeholder="Ex: Enxaqueca, Gripe, Diabetes..."
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            className="min-h-[100px] mb-4"
          />
          
          <Button 
            onClick={handleSearch}
            className="w-full bg-[#007] hover:bg-[#005] text-white"
            disabled={!disease.trim()}
          >
            Buscar sintomas
          </Button>
        </div>

        {result && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h4 className="text-[#007] font-bold text-lg mb-3">Sintomas da doença:</h4>
            <pre className="text-gray-700 leading-relaxed whitespace-pre-wrap font-sans mb-4">{result}</pre>
            
            {recommendations.length > 0 && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h5 className="text-green-800 font-bold text-lg mb-3">Recomendações de tratamento simples:</h5>
                <ul className="space-y-2">
                  {recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-2 text-green-700">
                      <span className="text-green-600 mt-1">•</span>
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Importante:</strong> Esta é apenas uma informação geral. Consulte sempre um médico para diagnóstico e tratamento adequados.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
