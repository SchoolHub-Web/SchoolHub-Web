'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { cn } from '@nextui-org/theme';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Absence } from '@/types';

const chartConfig = {
  absences: {
    label: 'absences',
    color: '#2563eb'
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa'
  }
} satisfies ChartConfig;

export default function AbsencesCard({
  absences,
  className = ''
}: {
  absences: Absence[];
  className?: string;
}) {
  let absencesPerMonth: number[] = [];
  for (let i = 0; i < 12; i++) {
    absencesPerMonth[i] = 0;
  }
  absences.forEach((absence) => {
    absencesPerMonth[new Date(absence.timestamp).getMonth()]++;
  });

  const chartData = [
    { month: 'September', absences: absencesPerMonth[8] },
    { month: 'October', absences: absencesPerMonth[9] },
    { month: 'November', absences: absencesPerMonth[10] },
    { month: 'December', absences: absencesPerMonth[11] },
    { month: 'January', absences: absencesPerMonth[0] },
    { month: 'February', absences: absencesPerMonth[1] },
    { month: 'March', absences: absencesPerMonth[2] },
    { month: 'April', absences: absencesPerMonth[3] },
    { month: 'May', absences: absencesPerMonth[4] },
    { month: 'June', absences: absencesPerMonth[5] }
  ];

  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl bg-white px-4 pb-5 pt-4',
        className
      )}
    >
      <div className='flex items-center text-xs font-semibold text-primary-600'>
        <i className='fa fa-calendar pr-2 text-xl' />
        <label>Absences</label>
      </div>
      <ChartContainer config={chartConfig} className='py-8'>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='month'
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey='absences' fill='#5d71d4' radius={4} />
        </BarChart>
      </ChartContainer>
      <div className='flex justify-between gap-4'>
        <div className='flex max-w-40 grow flex-col gap-2'>
          <h3 className='text-[0.875rem] font-semibold text-primary-600'>
            Date
          </h3>
          <div className='flex flex-col gap-1'>
            {absences.map((absence, index) => (
              <div key={index} className='flex items-center gap-2'>
                <label className='text-[0.875rem] font-semibold text-primary-900'>
                  {new Date(absence.timestamp).toLocaleDateString()}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <h3 className='text-[0.875rem] font-semibold text-primary-600'>
            Excused
          </h3>
          <div className='flex flex-col gap-1'>
            {absences.map((absence, index) => (
              <>
                {absence.excused ? (
                  <label
                    key={index}
                    className='flex items-center gap-2 text-xs font-semibold text-green-500'
                  >
                    <i className='fa fa-check-circle text-xl' />
                    Excused
                  </label>
                ) : (
                  <label
                    key={index}
                    className='flex items-center gap-2 text-xs font-semibold text-red-500'
                  >
                    <i className='fa fa-xmark-circle text-xl' />
                    Not excused
                  </label>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
