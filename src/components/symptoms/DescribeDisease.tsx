
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
    
    if (lowerDisease.includes('enxaqueca')) {
      setResult('ENXAQUECA - Os principais sintomas incluem:\n\n• Dor de cabeça intensa e pulsante\n• Sensibilidade à luz (fotofobia)\n• Náuseas e vômitos\n• Sensibilidade ao som\n• Dor geralmente em um lado da cabeça\n• Pode durar de 4 a 72 horas');
      setRecommendations([
        'Descansar em ambiente escuro e silencioso',
        'Aplicar compressas frias na testa',
        'Chá de camomila para relaxamento',
        'Massagem suave nas têmporas',
        'Evitar alimentos que podem ser gatilhos (chocolate, queijos)',
        'Procurar um médico se persistir'
      ]);
    } else if (lowerDisease.includes('gripe') || lowerDisease.includes('influenza')) {
      setResult('GRIPE (INFLUENZA) - Os principais sintomas incluem:\n\n• Febre\n• Dor de garganta\n• Tosse seca\n• Dores no corpo\n• Cansaço\n• Coriza');
      setRecommendations([
        'Chá de limão com mel',
        'Repouso absoluto',
        'Hidratação com bastante água',
        'Usar umidificador ou inalação com soro fisiológico',
        'Procurar um médico se persistir por mais de 5 dias'
      ]);
    } else if (lowerDisease.includes('resfriado')) {
      setResult('RESFRIADO COMUM - Os principais sintomas incluem:\n\n• Espirros\n• Coriza\n• Nariz entupido\n• Leve dor de cabeça\n• Garganta arranhando');
      setRecommendations([
        'Chá de hortelã ou gengibre',
        'Banho quente para aliviar congestão nasal',
        'Dormir com a cabeça levemente elevada',
        'Evitar ambientes com ar-condicionado forte',
        'Procurar um médico se os sintomas piorarem'
      ]);
    } else if (lowerDisease.includes('dengue')) {
      setResult('DENGUE - Os principais sintomas incluem:\n\n• Febre alta\n• Dor atrás dos olhos\n• Dores no corpo e articulações\n• Manchas vermelhas na pele\n• Náuseas');
      setRecommendations([
        'Repouso absoluto',
        'Beber bastante líquido (água, sucos naturais, água de coco)',
        'Evitar automedicação',
        'Procurar um posto de saúde imediatamente'
      ]);
    } else if (lowerDisease.includes('infecção urinária') || lowerDisease.includes('infeccao urinaria')) {
      setResult('INFECÇÃO URINÁRIA - Os principais sintomas incluem:\n\n• Ardência ao urinar\n• Vontade frequente de urinar\n• Urina turva ou com odor forte\n• Dor no baixo ventre');
      setRecommendations([
        'Beber bastante água',
        'Chá de quebra-pedra ou de uva-ursina',
        'Manter boa higiene íntima',
        'Evitar segurar a urina por muito tempo',
        'Procurar um médico se os sintomas persistirem'
      ]);
    } else if (lowerDisease.includes('dor de garganta') || lowerDisease.includes('amigdalite')) {
      setResult('DOR DE GARGANTA (AMIGDALITE SIMPLES) - Os principais sintomas incluem:\n\n• Dor ao engolir\n• Garganta vermelha ou inchada\n• Febre leve\n• Mau hálito');
      setRecommendations([
        'Gargarejo com água morna e sal',
        'Chá de gengibre com mel',
        'Evitar bebidas geladas',
        'Falar pouco e repousar a voz',
        'Procurar um médico se a dor persistir por mais de 3 dias'
      ]);
    } else if (lowerDisease.includes('diabetes')) {
      setResult('DIABETES - Os principais sintomas incluem:\n\n• Sede excessiva\n• Urinar frequentemente\n• Fome excessiva\n• Perda de peso sem explicação\n• Fadiga\n• Visão embaçada\n• Cicatrização lenta de feridas');
      setRecommendations([
        'Manter alimentação equilibrada e regular',
        'Praticar exercícios físicos leves (caminhada)',
        'Beber bastante água',
        'Evitar açúcares e carboidratos refinados',
        'Controlar o peso corporal',
        'Procurar um médico endocrinologista'
      ]);
    } else if (lowerDisease.includes('gastrite')) {
      setResult('GASTRITE - Os principais sintomas incluem:\n\n• Dor no estômago\n• Azia\n• Náuseas\n• Sensação de queimação');
      setRecommendations([
        'Evitar alimentos ácidos e condimentados',
        'Fazer refeições menores e mais frequentes',
        'Chá de espinheira-santa',
        'Evitar jejum prolongado',
        'Beber bastante água',
        'Procurar um médico se os sintomas persistirem'
      ]);
    } else {
      setResult('Doença não encontrada na nossa base de dados. Consulte um médico para informações mais específicas sobre esta condição.');
      setRecommendations([
        'Manter hábitos saudáveis',
        'Beber bastante água',
        'Praticar exercícios regulares',
        'Ter uma alimentação equilibrada',
        'Procurar orientação médica'
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
            placeholder="Ex: Enxaqueca, Gripe, Dengue, Infecção urinária, Dor de garganta..."
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
