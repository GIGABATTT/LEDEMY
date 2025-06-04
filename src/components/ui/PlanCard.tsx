
import React from 'react';

interface PlanCardProps {
  title: string;
  price: string;
  cents: string;
  description: string;
  onClick?: () => void;
}

export const PlanCard: React.FC<PlanCardProps> = ({ title, price, cents, description, onClick }) => {
  return (
    <div 
      className="w-[179px] h-[281px] text-center bg-white p-5 rounded-[15px] cursor-pointer hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center"
      onClick={onClick}
    >
      <h2 className="text-[#010177] text-[32px] mx-0 my-2.5 font-bold">{title}</h2>
      <div className="text-[#007] text-[32px] font-bold">
        <span>{price},</span>
        <span className="text-2xl">{cents}</span>
        <span>/mês</span>
      </div>
      <div className="text-[#010177] text-xl mt-10 font-medium">•{description}</div>
    </div>
  );
};
