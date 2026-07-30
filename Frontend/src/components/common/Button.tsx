import React from 'react';
import { cn } from '../../utils/helpers';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export default function Button({
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-label-md font-medium transition-all duration-300';
  
  const variants = {
    primary: 'bg-primary hover:bg-primary-container text-white shadow-xl hover:scale-105 duration-500',
    secondary: 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface shadow-sm border border-outline-variant/30',
    outline: 'bg-transparent border border-outline-variant text-on-surface hover:bg-primary hover:text-white hover:border-primary',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20',
  };

  const sizes = {
    sm: 'px-md py-sm text-label-md',
    md: 'px-lg py-md text-label-md',
    lg: 'px-xl py-lg text-label-md',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
