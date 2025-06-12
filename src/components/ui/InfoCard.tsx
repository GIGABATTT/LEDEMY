
import React from 'react';

interface InfoCardProps {
  children: React.ReactNode;
}

export const InfoCard: React.FC<InfoCardProps> = ({ children }) => {
  return (
    <div className="w-[378px] h-[185px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] bg-white p-5 rounded-[15px] max-sm:w-full flex items-center justify-center">
      <div className="text-black text-xl text-center">{children}</div>
    </div>
  );
};
