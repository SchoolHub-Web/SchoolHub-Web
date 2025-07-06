import AnimatedTabs from '@/components/animated-tabs';
import Profile from '@/components/layout/profile';
import { TabModel } from '@/lib/types';

const tabs: TabModel[] = [
  {
    title: 'Grade calculator',
    icon: 'fa fa-calculator',
    href: '/grade-calculator'
  },
  {
    title: 'Classbook',
    icon: 'fa fa-book-open',
    href: '/classbook'
  }
];

export function Header() {
  return (
    <div className='flex'>
      <div className='grow basis-0' />
      <div className='flex grow basis-0 items-center'>
        <AnimatedTabs tabs={tabs} />
      </div>
      <Profile className='grow basis-0' src='/leaf.png' />
    </div>
  );
}
