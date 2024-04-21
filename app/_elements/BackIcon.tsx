import React from 'react';

type Props = {
  className?: string,
};

export default function BackIcon(props: Readonly<Props>) {
  const { className } = props;
  const cls = ['w-6 h-6', className].filter(Boolean).join(' ');
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={cls}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
  );
}
