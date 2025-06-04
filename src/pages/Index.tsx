
import React, { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { RegistrationForm } from '../components/auth/RegistrationForm';
import { MedicalInfoForm } from '../components/auth/MedicalInfoForm';
import { PlanSelection } from '../components/premium/PlanSelection';
import { Dashboard } from '../components/dashboard/Dashboard';
import { SymptomsSearch } from '../components/symptoms/SymptomsSearch';
import { UserProvider } from '../contexts/UserContext';
import { LanguageProvider } from '../contexts/LanguageContext';

// Import font styles
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Lexend+Deca&family=Alike&display=swap');
`;

enum AppScreen {
  LOGIN,
  REGISTRATION,
  MEDICAL_INFO,
  PLAN_SELECTION,
  DASHBOARD,
  SYMPTOMS_SEARCH
}

const Index: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.LOGIN);

  // Navigation handlers
  const handleRegister = () => setCurrentScreen(AppScreen.REGISTRATION);
  const handleBackToLogin = () => setCurrentScreen(AppScreen.LOGIN);
  const handleContinueToMedical = () => setCurrentScreen(AppScreen.MEDICAL_INFO);
  const handleBackToRegistration = () => setCurrentScreen(AppScreen.REGISTRATION);
  const handleContinueToPlan = () => setCurrentScreen(AppScreen.PLAN_SELECTION);
  const handleSkipToDashboard = () => setCurrentScreen(AppScreen.DASHBOARD);
  const handleClosePlan = () => setCurrentScreen(AppScreen.DASHBOARD);
  const handleNavigateToSymptoms = () => setCurrentScreen(AppScreen.SYMPTOMS_SEARCH);
  const handleBackToDashboard = () => setCurrentScreen(AppScreen.DASHBOARD);

  return (
    <LanguageProvider>
      <UserProvider>
        <div className="min-h-screen bg-page-gradient flex flex-col items-center justify-center p-4">
          <style>{fontStyles}</style>
          
          {currentScreen === AppScreen.LOGIN && (
            <LoginForm onRegister={handleRegister} />
          )}
          
          {currentScreen === AppScreen.REGISTRATION && (
            <RegistrationForm 
              onBack={handleBackToLogin} 
              onContinue={handleContinueToMedical} 
            />
          )}
          
          {currentScreen === AppScreen.MEDICAL_INFO && (
            <MedicalInfoForm 
              onBack={handleBackToRegistration} 
              onContinue={handleContinueToPlan}
              onSkip={handleContinueToPlan}
            />
          )}
          
          {currentScreen === AppScreen.PLAN_SELECTION && (
            <PlanSelection 
              onClose={handleClosePlan} 
              onSelectPlan={handleSkipToDashboard}
              onSkip={handleSkipToDashboard}
            />
          )}
          
          {currentScreen === AppScreen.DASHBOARD && (
            <Dashboard 
              onBackToLogin={handleBackToLogin}
              onNavigateToSymptoms={handleNavigateToSymptoms}
            />
          )}
          
          {currentScreen === AppScreen.SYMPTOMS_SEARCH && (
            <SymptomsSearch 
              onBackToDashboard={handleBackToDashboard}
            />
          )}
        </div>
      </UserProvider>
    </LanguageProvider>
  );
};

export default Index;
