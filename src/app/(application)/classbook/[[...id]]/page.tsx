'use client';

import GradesCard from '@/components/grades-card';
import AbsencesCard from '@/components/absences-card';
import SubjectHeaderCard from '@/components/subject-header-card';
import { Absence, Grade } from '@/types';

export default function Page({ params }: { params: { id: number[] } }) {
  const grades: Grade[] = [
    {
      id: 1,
      value: '10',
      timestamp: '2022-01-01T00:00:00.000Z'
    }
  ];
  const absences: Absence[] = [
    {
      id: 1,
      excused: false,
      timestamp: '2022-01-01T00:00:00.000Z'
    }
  ];
  const subject = {
    name: 'Math',
    icon: 'leaf'
  };

  const subjectGrades = grades.length;
  const maxGrades = 2;
  const average = 3;
  const absencesCount = absences.length;
  const unexcusedAbsences = absences?.filter(
    (absence) => !absence.excused
  ).length;

  return (
    <>
      {params.id && +params.id !== -1 ? (
        <>
          <SubjectHeaderCard
            {...subject}
            average={average ?? 0}
            grades={subjectGrades ?? 0}
            maxGrades={maxGrades}
            absences={absencesCount ?? 0}
            unexcusedAbsences={unexcusedAbsences ?? 0}
            title={subject?.name ?? ''}
            icon={subject?.icon ?? 'leaf'}
          />
          <GradesCard grades={grades} />
          <AbsencesCard absences={absences} />
        </>
      ) : (
        <h1 className='flex h-full w-full items-center justify-center text-[2rem] font-semibold text-primary-400'>
          No subject selected
        </h1>
      )}
    </>
  );
}
