import { ClassBookLayout } from '@/app/(application)/classbook/_layout';
import { ReactNode } from 'react';
import { getSubjects } from '@/api/subjects';
import { btoa } from 'node:buffer';

export interface Subject {
  id: number;
  icon: string;
  name: string;
  minGrades?: number;
  grades: number | null | undefined;
  average: number | null | undefined;
}

function toAlphanumeric(input: string): string {
  return input
    .normalize('NFD') // Step 1: Decompose characters
    .replace(/[\u0300-\u036f]/g, '') // Step 2: Remove accents
    .replace(/[^a-zA-Z0-9]/g, ''); // Step 3: Remove non-alphanumerics
}

export default async function ({ children }: { children: ReactNode }) {
  const subjects = await getSubjects();

  return (
    <ClassBookLayout
      // @ts-ignore
      subjects={subjects.map((item) => ({
        id: btoa(toAlphanumeric(item.name)),
        name: item.name,
        icon: 'leaf',
        minGrades: 5,
        grades: item.grades.length,
        absences: item.absences.length,
        average:
          item.grades.reduce((acc, curr) => acc + +curr.value, 0) /
          item.grades.length
      }))}
    >
      {children}
    </ClassBookLayout>
  );
}
