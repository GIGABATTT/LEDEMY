import React, { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
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
import { UserProvider } from '../contexts/UserContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ProfileInformation } from '../components/profile/ProfileInformation';

// Import font styles
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Lexend+Deca&family=Alike&display=swap');
`;

enum AppScreen {
  LOGIN,
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
  PROFILE
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
              onBackToLogin={handleBackToLogin}
              onNavigateToSymptoms={handleNavigateToSymptoms}
              onNavigateToReminders={handleNavigateToReminders}
              onNavigateToPharmacies={handleNavigateToPharmacies}
              onNavigateToEmergencyContacts={handleNavigateToEmergencyContacts}
              onNavigateToProfile={handleNavigateToProfile}
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
        </div>
      </UserProvider>
    </LanguageProvider>
  );
};

export default Index;
