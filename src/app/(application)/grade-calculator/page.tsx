import { getSubjects } from '@/api/subjects';
import { GradeCalculator } from '@/components/grade-calculator';

export default async function () {
  const subjects = await getSubjects();

  if (!subjects) {
    return (
      <h1 className='flex h-full w-full items-center justify-center text-[2rem] font-semibold text-primary-400'>
        No subjects found
      </h1>
    );
  }

  return (
    <div className='flex grow basis-0 flex-col overflow-auto'>
      <GradeCalculator subjects={subjects} />
    </div>
  );
}
