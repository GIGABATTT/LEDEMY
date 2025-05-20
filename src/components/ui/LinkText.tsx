import React from 'react';

interface LinkTextProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const LinkText: React.FC<LinkTextProps> = ({ href, children, className = '' }) => {
  return (
    <a
      href={href}
      className={`text-white text-base underline mx-0 my-[5px] hover:text-gray-200 transition-colors duration-200 ${className}`}
    >
      {children}
    </a>
  );
};
