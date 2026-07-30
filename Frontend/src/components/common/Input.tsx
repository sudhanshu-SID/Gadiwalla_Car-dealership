import React from 'react';
import { cn } from '../../utils/helpers';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ElementType;
  rightElement?: React.ReactNode;
}

export default function Input({
  className,
  icon: Icon,
  rightElement,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col relative group w-full">
      <div className="flex items-center gap-3 py-3">
        {Icon && (
          <Icon className="text-on-surface-variant/50 group-focus-within:text-primary-container transition-colors w-5 h-5" />
        )}
        <input
          className={cn(
            "w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 outline-none",
            className
          )}
          {...props}
        />
        {rightElement && (
          <div className="flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>
      {/* Minimalist Underline */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-surface-variant transition-all duration-300 group-focus-within:h-[2px] group-focus-within:bg-primary-container"></div>
    </div>
  );
}
