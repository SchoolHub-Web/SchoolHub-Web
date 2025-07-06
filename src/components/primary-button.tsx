import { Button } from '@nextui-org/button';
import { ReactNode } from 'react';

export default function PrimaryButton({
  children,
  className = '',
  type = 'button'
}: {
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}) {
  return (
    <Button
      type={type}
      className={`bg-secondary-500 rounded-full text-white text-base font-semibold !px-2.5 !py-2.5 !h-auto ${className}`}
    >
      {children}
    </Button>
  );
}
