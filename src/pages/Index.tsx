
import React, { useState } from 'react';
import { AuthScreen } from '../components/auth/AuthScreen';
import { RegistrationForm } from '../components/auth/RegistrationForm';
import { MedicalInfoForm } from '../components/auth/MedicalInfoForm';
import { PlanSelection } from '../components/premium/PlanSelection';
import { PremiumPayment } from '../components/premium/PremiumPayment';
import { FamilyPayment } from '../components/premium/FamilyPayment';
import { Dashboard } from '../components/dashboard/Dashboard';
import { SymptomsSearch } from '../components/symptoms/SymptomsSearch';
import { SymptomsSearchMain } from '../components/symptoms/SymptomsSearchMain';
import { DescribeSymptoms } from '../components/symptoms/DescribeSymptoms';
import { DescribeDisease } from '../components/symptoms/DescribeDisease';
import { NearbyPharmacies } from '../components/map/NearbyPharmacies';
import { EmergencyContacts } from '../components/contacts/EmergencyContacts';
import { HelpScreen } from '../components/help/HelpScreen';
import { ProfileInformation } from '../components/profile/ProfileInformation';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { LanguageProvider } from '../contexts/LanguageContext';

// Import font styles
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Lexend+Deca&family=Alike&display=swap');
`;

enum AppScreen {
  AUTH,
  REGISTRATION,
  MEDICAL_INFO,
  PLAN_SELECTION,
  PREMIUM_PAYMENT,
  FAMILY_PAYMENT,
  DASHBOARD,
  SYMPTOMS_SEARCH_MAIN,
  DESCRIBE_SYMPTOMS,
  DESCRIBE_DISEASE,
  REMINDERS,
  NEARBY_PHARMACIES,
  EMERGENCY_CONTACTS,
  PROFILE,
  HELP
}

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.AUTH);

  // Navigation handlers
  const handleAuthSuccess = () => setCurrentScreen(AppScreen.DASHBOARD);
  const handleContinueToMedical = () => setCurrentScreen(AppScreen.MEDICAL_INFO);
  const handleBackToRegistration = () => setCurrentScreen(AppScreen.REGISTRATION);
  const handleContinueToPlan = () => setCurrentScreen(AppScreen.PLAN_SELECTION);
  const handleSkipToDashboard = () => setCurrentScreen(AppScreen.DASHBOARD);
  const handleClosePlan = () => setCurrentScreen(AppScreen.DASHBOARD);
  const handleSelectPremium = () => setCurrentScreen(AppScreen.PREMIUM_PAYMENT);
  const handleSelectFamily = () => setCurrentScreen(AppScreen.FAMILY_PAYMENT);
  const handleBackToPlanSelection = () => setCurrentScreen(AppScreen.PLAN_SELECTION);
  const handlePaymentComplete = () => setCurrentScreen(AppScreen.DASHBOARD);
  const handleNavigateToSymptoms = () => setCurrentScreen(AppScreen.SYMPTOMS_SEARCH_MAIN);
  const handleNavigateToReminders = () => setCurrentScreen(AppScreen.REMINDERS);
  const handleNavigateToPharmacies = () => setCurrentScreen(AppScreen.NEARBY_PHARMACIES);
  const handleNavigateToEmergencyContacts = () => setCurrentScreen(AppScreen.EMERGENCY_CONTACTS);
  const handleBackToDashboard = () => setCurrentScreen(AppScreen.DASHBOARD);
  const handleDescribeSymptoms = () => setCurrentScreen(AppScreen.DESCRIBE_SYMPTOMS);
  const handleDescribeDisease = () => setCurrentScreen(AppScreen.DESCRIBE_DISEASE);
  const handleBackToSymptomsMain = () => setCurrentScreen(AppScreen.SYMPTOMS_SEARCH_MAIN);
  const handleNavigateToProfile = () => setCurrentScreen(AppScreen.PROFILE);
  const handleNavigateToHelp = () => setCurrentScreen(AppScreen.HELP);

  if (loading) {
    return (
      <div className="min-h-screen bg-page-gradient flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  // If user is not authenticated, show auth screen
  if (!user) {
    return (
      <div className="min-h-screen bg-page-gradient flex flex-col items-center justify-center p-4">
        <style>{fontStyles}</style>
        <AuthScreen onAuthSuccess={handleAuthSuccess} />
      </div>
    );
  }

  // If user is authenticated, show the app
  return (
    <div className="min-h-screen bg-page-gradient flex flex-col items-center justify-center p-4">
      <style>{fontStyles}</style>
      
      {currentScreen === AppScreen.REGISTRATION && (
        <RegistrationForm 
          onBack={() => setCurrentScreen(AppScreen.AUTH)} 
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
          onSelectPremium={handleSelectPremium}
          onSelectFamily={handleSelectFamily}
          onSkip={handleSkipToDashboard}
        />
      )}
      
      {currentScreen === AppScreen.PREMIUM_PAYMENT && (
        <PremiumPayment 
          onBack={handleBackToPlanSelection}
          onSwitchToFamily={handleSelectFamily}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
      
      {currentScreen === AppScreen.FAMILY_PAYMENT && (
        <FamilyPayment 
          onBack={handleBackToPlanSelection}
          onSwitchToPremium={handleSelectPremium}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
      
      {currentScreen === AppScreen.DASHBOARD && (
        <Dashboard 
          onBackToLogin={() => setCurrentScreen(AppScreen.AUTH)}
          onNavigateToSymptoms={handleNavigateToSymptoms}
          onNavigateToReminders={handleNavigateToReminders}
          onNavigateToPharmacies={handleNavigateToPharmacies}
          onNavigateToEmergencyContacts={handleNavigateToEmergencyContacts}
          onNavigateToProfile={handleNavigateToProfile}
          onNavigateToHelp={handleNavigateToHelp}
        />
      )}
      
      {currentScreen === AppScreen.SYMPTOMS_SEARCH_MAIN && (
        <SymptomsSearchMain 
          onBackToDashboard={handleBackToDashboard}
          onDescribeSymptoms={handleDescribeSymptoms}
          onDescribeDisease={handleDescribeDisease}
        />
      )}
      
      {currentScreen === AppScreen.DESCRIBE_SYMPTOMS && (
        <DescribeSymptoms 
          onBack={handleBackToSymptomsMain}
          onBackToDashboard={handleBackToDashboard}
        />
      )}
      
      {currentScreen === AppScreen.DESCRIBE_DISEASE && (
        <DescribeDisease 
          onBack={handleBackToSymptomsMain}
          onBackToDashboard={handleBackToDashboard}
        />
      )}
      
      {currentScreen === AppScreen.REMINDERS && (
        <SymptomsSearch 
          onBackToDashboard={handleBackToDashboard}
        />
      )}

      {currentScreen === AppScreen.NEARBY_PHARMACIES && (
        <NearbyPharmacies 
          onBackToDashboard={handleBackToDashboard}
        />
      )}

      {currentScreen === AppScreen.EMERGENCY_CONTACTS && (
        <EmergencyContacts 
          onBackToDashboard={handleBackToDashboard}
        />
      )}

      {currentScreen === AppScreen.PROFILE && (
        <ProfileInformation 
          onBackToDashboard={handleBackToDashboard}
        />
      )}

      {currentScreen === AppScreen.HELP && (
        <HelpScreen 
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
};

const Index: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
};

export default Index;
