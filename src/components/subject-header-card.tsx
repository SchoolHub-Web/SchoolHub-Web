export default function SubjectHeaderCard({
  title,
  icon,
  grades,
  maxGrades,
  average,
  absences,
  unexcusedAbsences
}: {
  title: string;
  icon: string;
  grades: number;
  maxGrades: number;
  average: number;
  absences: number;
  unexcusedAbsences: number;
}) {
  return (
    <div>
      <div className='flex flex-col gap-5 rounded-2xl bg-white px-5 pb-6 pt-5'>
        <div className='flex items-center'>
          {/*<img className='h-9' src={`/${icon}.png`} alt='icon' />*/}
          <div className='flex flex-col'>
            <h3 className='text-base font-semibold leading-tight text-primary-900'>
              {title}
            </h3>
          </div>
        </div>
        <div className='flex items-start'>
          <div className='flex grow basis-0 flex-col items-center'>
            <label className='text-base font-semibold text-green-600'>
              {grades}/{maxGrades}
            </label>
            <span className='text-center text-xs font-medium text-primary-700'>
              grades
            </span>
          </div>
          <div className='border-left-white/70 h-10 self-center border-l-1' />
          <div className='flex grow basis-0 flex-col items-center'>
            <label className='text-base font-semibold text-green-600'>
              {average.toFixed(2)}
            </label>
            <span className='text-center text-xs font-medium text-primary-700'>
              average
            </span>
          </div>
          <div className='border-left-white/70 h-10 self-center border-l-1' />
          <div className='flex grow basis-0 flex-col items-center'>
            <label className='text-base font-semibold text-red-600'>
              {absences}
            </label>
            <span className='text-center text-xs font-medium text-primary-700'>
              absences
            </span>
          </div>
          <div className='border-left-white/70 h-10 self-center border-l-1' />
          <div className='flex grow basis-0 flex-col items-center'>
            <label className='text-base font-semibold text-red-600'>
              {unexcusedAbsences}
            </label>
            <span className='max-w-min text-center text-xs font-medium text-primary-700'>
              unexcused absence{unexcusedAbsences === 1 ? '' : 's'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
