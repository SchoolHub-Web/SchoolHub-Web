import { Button } from '@nextui-org/button';
import { ReactNode } from 'react';

export default function PrimaryButton({
  children,
  className = '',
  type = 'button',
  onClick
}: {
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      type={type}
      className={`!h-auto rounded-full bg-secondary-500 !px-2.5 !py-2.5 text-base font-semibold text-white ${className}`}
    >
      {children}
    </Button>
  );
}
