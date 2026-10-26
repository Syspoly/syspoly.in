import React from 'react';

export const Loader = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizes[size]} border-electric-500/20 border-t-electric-500 rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export const Skeleton = ({ className = '' }) => {
  return (
    <div
      className={`bg-slate-800/60 animate-pulse rounded-xl ${className}`}
    ></div>
  );
};

export default Loader;
