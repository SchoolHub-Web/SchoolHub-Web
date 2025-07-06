'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Progress } from '@nextui-org/progress';
import { cn } from '@nextui-org/theme';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Grade } from '@/types';

const chartConfig = {
  desktop: {
    color: '#FF0000'
  }
} satisfies ChartConfig;

export default function GradesCard({
  grades,
  className = ''
}: {
  grades: Grade[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-2xl bg-white px-4 pb-5 pt-4',
        className
      )}
    >
      <div className='flex items-center text-xs font-semibold text-primary-600'>
        <i className='fa fa-chart-simple pr-2 text-xl' />
        <label>Grades</label>
      </div>
      <ChartContainer className='py-8' config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={grades}
          margin={{
            left: 12,
            right: 12
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='date'
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value: string) =>
              `${('0' + new Date(value).getDate()).slice(-2)}.${('0' + (new Date(value).getMonth() + 1)).slice(-2)}`
            }
          />
          <YAxis
            dataKey='value'
            type='number'
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            domain={[0, 10]}
            tickCount={10}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line
            dataKey='value'
            label='test'
            type='linear'
            stroke='#5d71d4'
            strokeWidth={4}
            dot={true}
            fill='#5d71d4'
          />
        </LineChart>
      </ChartContainer>
      <div className='flex justify-between gap-4'>
        <div className='flex max-w-40 grow flex-col gap-2'>
          <h3 className='text-[0.875rem] font-semibold text-primary-600'>
            Grade
          </h3>
          <div className='flex flex-col gap-1'>
            {grades.map((grade, index) => (
              <div key={index} className='flex items-center gap-2'>
                <label>{grade.value}</label>
                <Progress
                  classNames={{
                    indicator: 'bg-secondary-500'
                  }}
                  value={+grade.value}
                  maxValue={10}
                  size='sm'
                />
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <h3 className='text-[0.875rem] font-semibold text-primary-600'>
            Date
          </h3>
          <div className='flex flex-col gap-1'>
            {grades.map((grade, index) => (
              <div key={index} className='flex items-center gap-2'>
                <label className='text-[0.875rem] font-semibold text-primary-900'>
                  {new Date(grade.timestamp).toLocaleDateString()}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
