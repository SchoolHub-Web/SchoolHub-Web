import { motion } from 'framer-motion';
import { Key, ReactNode } from 'react';

export default function AnimatedPage({
  children,
  key,
  className = ''
}: {
  children: ReactNode;
  key: Key;
  className?: string;
}) {
  return (
    <motion.div
      key={key}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        type: 'keyframes',
        ease: 'easeInOut'
      }}
      className={`flex h-full w-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
