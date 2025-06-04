
import React, { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

export const FormInput: React.FC<FormInputProps> = ({ placeholder, ...props }) => {
  return (
    <div className="w-[358px] h-[65px] flex items-center bg-white mx-auto my-2.5 px-5 py-0 rounded-[20px_0]">
      <input
        className="w-full h-full text-xl text-[rgba(0,0,0,0.54)] border-[none] focus:outline-none"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};
