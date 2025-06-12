
import React, { ButtonHTMLAttributes } from 'react';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ children, ...props }) => {
  return (
    <button 
      className="w-full max-w-[280px] min-h-[60px] text-white text-lg sm:text-xl cursor-pointer mx-auto my-4 rounded-[27px] border-[none] btn-gradient btn-click-animation flex items-center justify-center touch-manipulation px-6 py-3"
      {...props}
    >
      {children}
    </button>
  );
};
