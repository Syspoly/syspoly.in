import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon: Icon
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer tracking-wide';

  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-xl shadow-blue-500/20 focus:ring-blue-500 active:scale-[0.98]',
    secondary: 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 hover:border-blue-400 hover:text-blue-600 focus:ring-slate-500 active:scale-[0.98] shadow-sm',
    outline: 'bg-transparent text-slate-700 border border-slate-300 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50/50 focus:ring-blue-500',
    ghost: 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-500',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white focus:ring-rose-500 shadow-md'
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs font-semibold gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5 font-extrabold'
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {Icon && <Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`group ${combinedClasses}`}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`group ${combinedClasses}`}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`group ${combinedClasses}`}>
      {content}
    </button>
  );
};

export default Button;
