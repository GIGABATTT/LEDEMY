
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'pt-BR' | 'en' | 'ja';

interface Translations {
  // Login page
  emailPlaceholder: string;
  passwordPlaceholder: string;
  forgotPassword: string;
  termsOfService: string;
  registerButton: string;

  // Registration page
  namePlaceholder: string;
  agePlaceholder: string;
  pathologyPlaceholder: string;
  emergencyContactPlaceholder: string;
  addressPlaceholder: string;
  whatIsLedemy: string;
  continueButton: string;

  // Medical Info page
  bloodTypePlaceholder: string;
  allergiesPlaceholder: string;
  healthPlanPlaceholder: string;
  skipButton: string;

  // Plan Selection page
  improveExperience: string;
  experience: string;
  premiumPlan: string;
  familyPlan: string;
  individual: string;
  upToThreePeople: string;
  choosePlan: string;
  maybeLater: string;

  // Dashboard page
  welcome: string;
  searchSymptoms: string;
  setReminders: string;
  nearbyPharmacies: string;
  emergencyContacts: string;
  howToUse: string;
  searchSymptomsDesc: string;
  setRemindersDesc: string;
  nearbyPharmaciesDesc: string;
  emergencyContactsDesc: string;
}

const translations: Record<Language, Translations> = {
  'pt-BR': {
    emailPlaceholder: 'Endereço de e-mail',
    passwordPlaceholder: 'Senha',
    forgotPassword: 'Esqueceu a senha?',
    termsOfService: 'Termos de serviço',
    registerButton: 'CADASTRAR',
    namePlaceholder: 'Nome',
    agePlaceholder: 'Idade',
    pathologyPlaceholder: 'Patologia (opcional)',
    emergencyContactPlaceholder: 'Contato de emergência',
    addressPlaceholder: 'Endereço',
    whatIsLedemy: 'Afinal, oque é a ledemy?',
    continueButton: 'Continuar',
    bloodTypePlaceholder: 'Tipo sanguíneo',
    allergiesPlaceholder: 'Alergias',
    healthPlanPlaceholder: 'Plano de saúde',
    skipButton: 'Pular',
    improveExperience: 'Gostaria de melhorar sua',
    experience: 'experiência',
    premiumPlan: 'PREMIUM',
    familyPlan: 'FAMILIAR',
    individual: 'Individual',
    upToThreePeople: 'Até 3 pessoas',
    choosePlan: 'Escolher plano',
    maybeLater: 'Talvez depois',
    welcome: 'Seja bem vindo',
    searchSymptoms: 'Pesquisar sintomas',
    setReminders: 'Configurar lembretes',
    nearbyPharmacies: 'Farmácias por perto',
    emergencyContacts: 'Contatos de emergência',
    howToUse: 'Como utilizar?',
    searchSymptomsDesc: 'Digite seus sintomas e encontre possíveis diagnósticos',
    setRemindersDesc: 'Configure lembretes para medicamentos e consultas',
    nearbyPharmaciesDesc: 'Encontre farmácias próximas à sua localização',
    emergencyContactsDesc: 'Acesse rapidamente seus contatos de emergência'
  },
  'en': {
    emailPlaceholder: 'Email address',
    passwordPlaceholder: 'Password',
    forgotPassword: 'Forgot password?',
    termsOfService: 'Terms of service',
    registerButton: 'REGISTER',
    namePlaceholder: 'Name',
    agePlaceholder: 'Age',
    pathologyPlaceholder: 'Pathology (optional)',
    emergencyContactPlaceholder: 'Emergency contact',
    addressPlaceholder: 'Address',
    whatIsLedemy: 'What is Ledemy anyway?',
    continueButton: 'Continue',
    bloodTypePlaceholder: 'Blood type',
    allergiesPlaceholder: 'Allergies',
    healthPlanPlaceholder: 'Health plan',
    skipButton: 'Skip',
    improveExperience: 'Would you like to improve your',
    experience: 'experience',
    premiumPlan: 'PREMIUM',
    familyPlan: 'FAMILY',
    individual: 'Individual',
    upToThreePeople: 'Up to 3 people',
    choosePlan: 'Choose plan',
    maybeLater: 'Maybe later',
    welcome: 'Welcome',
    searchSymptoms: 'Search symptoms',
    setReminders: 'Set reminders',
    nearbyPharmacies: 'Nearby pharmacies',
    emergencyContacts: 'Emergency contacts',
    howToUse: 'How to use?',
    searchSymptomsDesc: 'Enter your symptoms and find possible diagnoses',
    setRemindersDesc: 'Set reminders for medications and appointments',
    nearbyPharmaciesDesc: 'Find pharmacies near your location',
    emergencyContactsDesc: 'Quickly access your emergency contacts'
  },
  'ja': {
    emailPlaceholder: 'メールアドレス',
    passwordPlaceholder: 'パスワード',
    forgotPassword: 'パスワードを忘れましたか？',
    termsOfService: '利用規約',
    registerButton: '登録',
    namePlaceholder: '名前',
    agePlaceholder: '年齢',
    pathologyPlaceholder: '病理（任意）',
    emergencyContactPlaceholder: '緊急連絡先',
    addressPlaceholder: '住所',
    whatIsLedemy: 'Ledemyとは何ですか？',
    continueButton: '続行',
    bloodTypePlaceholder: '血液型',
    allergiesPlaceholder: 'アレルギー',
    healthPlanPlaceholder: '健康保険',
    skipButton: 'スキップ',
    improveExperience: 'あなたの',
    experience: '体験',
    premiumPlan: 'プレミアム',
    familyPlan: 'ファミリー',
    individual: '個人',
    upToThreePeople: '最大3人',
    choosePlan: 'プランを選択',
    maybeLater: '後で',
    welcome: 'ようこそ',
    searchSymptoms: '症状を検索',
    setReminders: 'リマインダー設定',
    nearbyPharmacies: '近くの薬局',
    emergencyContacts: '緊急連絡先',
    howToUse: '使い方',
    searchSymptomsDesc: '症状を入力して可能な診断を見つける',
    setRemindersDesc: '薬や予約のリマインダーを設定',
    nearbyPharmaciesDesc: 'あなたの場所の近くの薬局を探す',
    emergencyContactsDesc: '緊急連絡先にすばやくアクセス'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt-BR');
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
