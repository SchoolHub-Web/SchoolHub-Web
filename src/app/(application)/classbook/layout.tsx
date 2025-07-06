'use client';

import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import AnimatedPage from '@/components/animated-page';
import SubjectList from '@/components/subject-list';
import { Subject } from '@/types';

const subjects: Subject[] = [
  {
    grades: 3,
    minGrades: 4,
    icon: 'leaf',
    average: 3,
    name: 'Mathematics',
    id: 12
  },
  {
    grades: 5,
    minGrades: 6,
    icon: 'leaf',
    average: 4.2,
    name: 'Biology',
    id: 13
  },
  {
    grades: 2,
    minGrades: 3,
    icon: 'leaf',
    average: 2.5,
    name: 'Chemistry',
    id: 14
  },
  {
    grades: 4,
    minGrades: 4,
    icon: 'leaf',
    average: 3.8,
    name: 'History',
    id: 15
  },
  {
    grades: 6,
    minGrades: 5,
    icon: 'leaf',
    average: 4.9,
    name: 'Geography',
    id: 16
  },
  {
    grades: 3,
    minGrades: 4,
    icon: 'leaf',
    average: 3.3,
    name: 'Physics',
    id: 17
  },
  {
    grades: 4,
    minGrades: 5,
    icon: 'leaf',
    average: 4.1,
    name: 'Literature',
    id: 18
  },
  {
    grades: 5,
    minGrades: 6,
    icon: 'leaf',
    average: 4.7,
    name: 'English',
    id: 19
  },
  {
    grades: 2,
    minGrades: 3,
    icon: 'leaf',
    average: 2.9,
    name: 'Art',
    id: 20
  },
  {
    grades: 3,
    minGrades: 4,
    icon: 'leaf',
    average: 3.6,
    name: 'Computer Science',
    id: 21
  }
];

export default function Layout({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<number>(-1);
  const router = useRouter();

  function onSelect(index: number) {
    setSelected(index);
    router.push(`/classbook/${index}`);
  }

  return (
    <AnimatedPage key='classbook' className='h-0 grow pt-5'>
      <SubjectList
        subjects={subjects}
        selected={selected}
        onSelected={onSelect}
      />
      <div className='flex h-full grow flex-col gap-4 overflow-y-auto overflow-x-hidden rounded-r-[1.25rem] bg-white/60 p-[1.875rem]'>
        {children}
      </div>
    </AnimatedPage>
  );
}
