'use client';

import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import AnimatedPage from '@/components/animated-page';
import SubjectList from '@/components/subject-list';
import { Subject } from '@/types';

export function ClassBookLayout({
  children,
  subjects
}: {
  children: ReactNode;
  subjects: Subject[];
}) {
  const [selected, setSelected] = useState<number>(-1);
  const router = useRouter();

  function onSelect(index: number) {
    setSelected(index);
    router.push(`/classbook/${index}`);
  }

  return (
    <AnimatedPage className='!h-0 grow pt-5'>
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
