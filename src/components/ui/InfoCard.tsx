
import React from 'react';

interface InfoCardProps {
  children: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ children }) => {
  return (
    <div className="w-full max-w-[378px] min-h-[120px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-white p-4 rounded-[15px] flex items-center justify-center mx-auto">
      <div className="text-black text-base sm:text-lg md:text-xl text-center leading-relaxed">{children}</div>
    </div>
  );
};
