import GradesCard from '@/components/grades-card';
import AbsencesCard from '@/components/absences-card';
import SubjectHeaderCard from '@/components/subject-header-card';
import { getSubjects } from '@/api/subjects';
import { btoa } from 'node:buffer';

function toAlphanumeric(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '');
}

export default async function Page({ params }: { params: { id: string[] } }) {
  const subjects = await getSubjects();

  if (!subjects) {
    return (
      <h1 className='flex h-full w-full items-center justify-center text-[2rem] font-semibold text-primary-400'>
        No subjects found
      </h1>
    );
  }

  if (!params?.id?.length) {
    return (
      <h1 className='flex h-full w-full items-center justify-center text-[2rem] font-semibold text-primary-400'>
        No subject selected
      </h1>
    );
  }

  const subject = subjects.find(
    (subject) =>
      encodeURIComponent(btoa(toAlphanumeric(subject.name))) === params.id[0]
  )!;

  const subjectGrades = subject.grades.length;
  const maxGrades = 4;
  const average =
    subject.grades.reduce((acc, curr) => acc + curr.value, 0) /
    subject.grades.length;
  const absencesCount = subject.absences.length;
  const unexcusedAbsences = subject.absences?.filter(
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
          <GradesCard grades={subject.grades} />
          <AbsencesCard absences={subject.absences} />
        </>
      ) : (
        <h1 className='flex h-full w-full items-center justify-center text-[2rem] font-semibold text-primary-400'>
          No subject selected
        </h1>
      )}
    </>
  );
}
