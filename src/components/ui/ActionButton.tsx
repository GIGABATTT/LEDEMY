import React, { ButtonHTMLAttributes } from 'react';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ children, ...props }) => {
  return (
    <button 
      className="w-[226px] h-[87px] text-white text-2xl cursor-pointer mx-auto my-5 rounded-[27px] border-[none] bg-[#010177] hover:bg-[#01015e] transition-colors duration-200 flex items-center justify-center"
      {...props}
    >
      {children}
    </button>
  );
};
