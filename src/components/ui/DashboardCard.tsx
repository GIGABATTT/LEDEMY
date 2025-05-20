
import React from 'react';

interface DashboardCardProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ icon, text, onClick }) => {
  return (
    <div 
      className="w-[378px] h-[76px] flex items-center shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-white px-5 py-0 rounded-[15px] max-sm:w-full cursor-pointer hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] active:shadow-md"
      onClick={onClick}
    >
      <div className="transform transition-transform duration-300 group-hover:rotate-12">{icon}</div>
      <div className="text-black text-xl ml-5">{text}</div>
    </div>
  );
};
