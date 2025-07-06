import { cn } from '@nextui-org/theme';
import { Subject } from '@/types';

export default function SelectableItemList({
  items,
  selected,
  onSelected = () => undefined,
  className = ''
}: {
  items: Subject[];
  selected: number;
  onSelected?: (index: number) => void;
  className?: string;
}) {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            'flex cursor-pointer items-center rounded-[0.635rem] px-1.5',
            +item.id == selected ? 'bg-secondary-500' : ''
          )}
          onClick={() => {
            onSelected(+item.id);
          }}
        >
          {item.icon ? (
            <img className='mr-3 w-9' src={`/${item.icon}.png`} alt='icon' />
          ) : (
            ''
          )}
          <div className='flex grow items-center justify-between gap-4 border-b-1 border-b-black/5 py-2.5'>
            <h3
              className={cn(
                'text-[0.9375rem] font-semibold',
                +item.id == selected ? 'text-primary-50' : 'text-primary-900'
              )}
            >
              {item.name}
            </h3>
            <div className='flex gap-4'>
              <div className='flex flex-col items-center'>
                <label
                  className={cn(
                    'text-[0.9375rem] font-semibold',
                    +item.id == selected
                      ? 'text-primary-50'
                      : 'text-primary-900'
                  )}
                >
                  {item.minGrades
                    ? `${item.grades}/${item.minGrades}`
                    : `${item.grades}`}
                </label>
                <span
                  className={cn(
                    'text-[0.6875rem] font-medium',
                    +item.id == selected
                      ? 'text-primary-100'
                      : 'text-primary-700'
                  )}
                >
                  grades
                </span>
              </div>
              <div className='flex flex-col items-center'>
                <label
                  className={cn(
                    'text-[0.9375rem] font-semibold',
                    +item.id == selected
                      ? 'text-primary-50'
                      : 'text-primary-900'
                  )}
                >
                  {item.average?.toFixed(2)}
                </label>
                <span
                  className={cn(
                    'text-[0.6875rem] font-medium',
                    +item.id == selected
                      ? 'text-primary-100'
                      : 'text-primary-700'
                  )}
                >
                  average
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
