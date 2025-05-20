
import React from 'react';

interface LinkTextProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const LinkText: React.FC<LinkTextProps> = ({ href, children, className = '', onClick }) => {
  return (
    <a
      href={href}
      className={`text-white text-base underline mx-0 my-[5px] hover:text-gray-200 transition-colors duration-200 ${className}`}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </a>
  );
};
