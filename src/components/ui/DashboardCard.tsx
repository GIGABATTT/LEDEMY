
import React from 'react';

interface DashboardCardProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ icon, text, onClick }) => {
  return (
    <div 
      className="w-full max-w-[378px] min-h-[76px] flex items-center shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-white px-4 py-4 rounded-[15px] cursor-pointer hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] active:shadow-md touch-manipulation mx-auto"
      onClick={onClick}
    >
      <div className="transform transition-transform duration-300 group-hover:rotate-12 flex-shrink-0">{icon}</div>
      <div className="text-black text-lg sm:text-xl ml-4 text-center flex-1">{text}</div>
    </div>
  );
};
