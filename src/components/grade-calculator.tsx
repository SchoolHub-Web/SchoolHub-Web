'use client';

import { FullSubject } from '@/types';
import { useState } from 'react';

export function GradeCalculator({ subjects }: { subjects: FullSubject[] }) {
  const [simulatedGrades, setSimulatedGrades] = useState<
    Record<number, number[]>
  >({});
  const [currentGrade, setCurrentGrade] = useState<Record<string, string>>({});

  const handleAddGrade = (subjectId: string, grade: string) => {
    const numGrade = Number(grade);
    if (numGrade >= 1 && numGrade <= 10) {
      setSimulatedGrades((prev) => ({
        ...prev,
        [subjectId]: [...(prev[subjectId] || []), numGrade]
      }));
    }
  };

  const calculateAverage = (subjectId: string) => {
    const existingGrades =
      subjects.find((s) => s.id === subjectId)?.grades || [];
    const simulated = simulatedGrades[subjectId] || [];
    const allGrades = [
      ...existingGrades.map((grade) => grade.value),
      ...simulated
    ];

    return allGrades.length > 0
      ? (
          allGrades.reduce((sum, grade) => sum + +grade, 0) / allGrades.length
        ).toFixed(2)
      : '0.00';
  };

  const calculateOverallAverage = () => {
    const allAverages = subjects.map((subject) =>
      parseFloat(calculateAverage(subject.id))
    );
    return allAverages.length > 0
      ? (
          allAverages.reduce((sum, avg) => sum + Math.round(avg), 0) /
          allAverages.length
        ).toFixed(2)
      : '0.00';
  };

  return (
    <div className='overflflow-hidden flex grow basis-0 flex-col gap-4 p-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-primary-400'>
          Grade Calculator
        </h2>
        <span className='text-xl font-bold text-primary-400'>
          Overall Average: {calculateOverallAverage()}
        </span>
      </div>
      <div className='flex flex-col gap-3'>
        {subjects.map((subject) => (
          <div
            key={subject.id}
            className='flex flex-col gap-2 rounded-lg bg-white/80 p-4'
          >
            <div className='flex items-center justify-between'>
              <span className='font-medium'>{subject.name}</span>
              <span className='font-bold'>
                Average: {calculateAverage(subject.id)}
              </span>
            </div>
            <div className='flex flex-wrap gap-2'>
              {subject.grades.map((grade, idx) => (
                <span key={idx} className='rounded bg-primary-400/20 px-3 py-1'>
                  {grade.value}
                </span>
              ))}
              {simulatedGrades[subject.id]?.map((grade, idx) => (
                <span
                  key={`sim-${idx}`}
                  className='rounded bg-secondary-500 px-3 py-1 text-white'
                >
                  {grade}
                </span>
              ))}
            </div>
            <div className='mt-2 flex items-center gap-2'>
              <input
                type='number'
                min='1'
                max='10'
                step='1'
                className='w-20 rounded rounded-full border p-2 focus:outline-none focus:ring-2 focus:ring-primary-400'
                placeholder='1-10'
                value={currentGrade[subject.id] || ''}
                onChange={(e) =>
                  setCurrentGrade((prev) => ({
                    ...prev,
                    [subject.id]: e.target.value
                  }))
                }
              />
              <button
                className='rounded bg-secondary-500 px-3 py-1 text-white'
                onClick={() => {
                  handleAddGrade(subject.id, currentGrade[subject.id]);
                  setCurrentGrade((prev) => ({ ...prev, [subject.id]: '' }));
                }}
              >
                Add Simulated Grade
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className='mt-4 self-end rounded-lg bg-white/80 p-4'>
        <div className='flex items-center gap-2'>
          <span className='rounded bg-primary-400/20 px-3 py-1'>Existing</span>
          <span className='rounded bg-secondary-500 px-3 py-1 text-white'>
            Simulated
          </span>
        </div>
      </div>
    </div>
  );
}
