import LogoExpanded from '@/components/logo-expanded';
import {
  Calculator,
  BookOpen,
  Book,
  BookA,
  FileQuestion,
  Brain,
  BrainCircuit
} from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

type AppCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
};

const applications: AppCardProps[] = [
  {
    title: 'Grade Calculator',
    description: 'Calculate and manage your grades easily',
    icon: <Calculator className='h-8 w-8' />,
    href: '/grade-calculator'
  },
  {
    title: 'Classbook',
    description: 'Access your digital class materials',
    icon: <BookA className='h-8 w-8' />,
    href: '/classbook'
  },
  {
    title: 'Literaria',
    description: 'Learn everything about Romanian literature in one place',
    icon: <BookOpen className='h-8 w-8' />,
    href: 'https://literaria.info/'
  },
  {
    title: 'QuizCraft',
    description: 'Build quizzes for free using AI in minutes from your notes',
    icon: <BrainCircuit className='h-8 w-8' />,
    href: 'https://quiz-craft-one.vercel.app/'
  }
];

export default function () {
  return (
    <main className='flex h-screen w-screen flex-col items-center overflow-y-auto bg-gradient-to-tr from-sky-100 to-indigo-300 p-4 pt-10 sm:pt-40'>
      <LogoExpanded className='block w-40 pb-10 sm:w-80' />
      <div className='grid grid-cols-1 gap-4 p-4 sm:grid-cols-2'>
        {applications.map((app) => (
          <Link
            key={app.href}
            href={app.href}
            className='group flex w-64 cursor-pointer flex-col gap-2 rounded-xl bg-white/40 p-4 backdrop-blur-sm transition-all hover:bg-white/20'
          >
            <div className='flex items-center gap-2 text-primary-600'>
              <div>{app.icon}</div>
            </div>
            <h3 className='text-xl font-semibold text-primary-900'>
              {app.title}
            </h3>
            <p className='text-sm text-gray-600'>{app.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
