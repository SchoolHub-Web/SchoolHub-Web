'use client';

import { Tab, Tabs } from '@nextui-org/tabs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { TabModel } from '@/lib/types';

const container = {
  initial: { fontSize: 0, width: 0, opacity: 0 },
  animate: {
    fontSize: '.75rem',
    width: 'auto',
    opacity: 1,
    transition: {
      duration: 0.1
    }
  },
  exit: {
    fontSize: 0,
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.1
    }
  }
};

export default function AnimatedTabs({ tabs }: { tabs: TabModel[] }) {
  const pathname = usePathname();

  return (
    <Tabs
      classNames={{
        tabList: 'bg-white/40 rounded-[1rem]',
        tabContent: 'font-semibold text-xs text-primary-900',
        cursor: 'rounded-[0.75rem] shadow-none'
      }}
      className='grow justify-center'
      selectedKey={tabs.find((tab) => pathname.includes(tab.href))?.href}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.href}
          as={Link}
          href={tab.href}
          title={
            <div className='flex items-center gap-1 text-primary-700'>
              <i className={`fa ${tab.icon} mr-2 text-xl`} />
              <AnimatePresence>
                {pathname.includes(tab.href) && (
                  <motion.label
                    variants={container}
                    key={tab.href}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                  >
                    {tab.title}
                  </motion.label>
                )}
              </AnimatePresence>
            </div>
          }
        />
      ))}
    </Tabs>
  );
}
