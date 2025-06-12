
import React, { InputHTMLAttributes, useState } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  showEmailSuggestions?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({ placeholder, showEmailSuggestions, value, onChange, ...props }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const emailSuggestions = [
    'usuario@gmail.com',
    'usuario@hotmail.com',
    'usuario@yahoo.com',
    'usuario@outlook.com',
    'usuario@icloud.com'
  ];

  const handleEmailSuggestionClick = (suggestion: string) => {
    if (onChange) {
      onChange({ target: { value: suggestion } } as React.ChangeEvent<HTMLInputElement>);
    }
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-[358px] mx-auto my-2.5">
      <div className="w-full min-h-[65px] flex items-center bg-white px-4 py-3 rounded-[20px_0]">
        <input
          className="w-full h-full text-base sm:text-lg text-[rgba(0,0,0,0.54)] border-[none] focus:outline-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => showEmailSuggestions && placeholder.includes('e-mail') && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          style={{ fontSize: '16px' }} // Prevents zoom on iOS
          {...props}
        />
      </div>
      
      {showEmailSuggestions && showSuggestions && placeholder.includes('e-mail') && (
        <div className="absolute top-[70px] left-0 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-10 max-h-40 overflow-y-auto">
          {emailSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-gray-700 touch-manipulation"
              onClick={() => handleEmailSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
