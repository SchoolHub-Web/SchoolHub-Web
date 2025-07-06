import { motion } from 'framer-motion';
import { RefObject, useEffect, useState } from 'react';

export function FloatingElements({
  originRef
}: {
  originRef: RefObject<HTMLDivElement>;
}) {
  const [bBox, setBBox] = useState<DOMRect>(
    originRef.current!.getBoundingClientRect()
  );

  useEffect(() => {
    function onResize() {
      setBBox(originRef.current!.getBoundingClientRect());
    }

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <>
      <div className='hidden sm:block'>
        <motion.img
          className='absolute select-none'
          initial={{
            x: bBox.left,
            y: bBox.top
          }}
          animate={{
            x: bBox.left - 150,
            y: bBox.top - 80
          }}
          src='/hat.png'
          alt='hat'
        />
        <motion.img
          className='absolute select-none'
          initial={{
            x: bBox.left,
            y: bBox.top + (20 / 100) * bBox.height
          }}
          animate={{
            x: bBox.left - 165,
            y: bBox.top + (20 / 100) * bBox.height
          }}
          src='/crayons.png'
          alt='crayons'
        />
        <motion.img
          className='absolute select-none'
          initial={{
            x: bBox.left,
            y: bBox.top + (40 / 100) * bBox.height
          }}
          animate={{
            x: bBox.left - 195,
            y: bBox.top + (40 / 100) * bBox.height
          }}
          src='/leaf.png'
          alt='leaf'
        />
        <motion.img
          className='absolute select-none'
          initial={{
            x: bBox.left,
            y: bBox.bottom - 120
          }}
          animate={{
            x: bBox.left - 105,
            y: bBox.bottom - 75
          }}
          src='/books.png'
          alt='books'
        />
        <motion.img
          className='absolute select-none'
          initial={{
            x: bBox.left,
            y: bBox.top + (16 / 100) * bBox.height
          }}
          animate={{
            x: bBox.left - 370,
            y: bBox.top + (16 / 100) * bBox.height
          }}
          src='/computer.png'
          alt='computer'
        />
        <motion.img
          className='absolute select-none'
          initial={{
            x: bBox.left,
            y: bBox.bottom - 180,
            rotate: -70
          }}
          animate={{
            x: bBox.left - 330,
            y: bBox.bottom - 180,
            rotate: -70
          }}
          src='/tube.png'
          alt='tube'
        />
        <motion.img
          className='absolute select-none'
          initial={{
            x: bBox.right - 100,
            y: bBox.top
          }}
          animate={{
            x: bBox.right - 50,
            y: bBox.top - 67
          }}
          src='/tube.png'
          alt='tube'
        />
        <motion.img
          className='absolute select-none'
          initial={{
            x: bBox.right - 100,
            y: bBox.top + 90
          }}
          animate={{
            x: bBox.right - 73,
            y: bBox.top + 90
          }}
          src='/todo.png'
          alt='todo'
        />
        <motion.img
          className='absolute select-none'
          initial={{
            x: bBox.right - 100,
            y: bBox.top + 140
          }}
          animate={{
            x: bBox.right + 200,
            y: bBox.top + 140
          }}
          src='/compass.png'
          alt='compass'
        />
        <motion.img
          className='absolute select-none'
          initial={{
            x: bBox.right - 100,
            y: bBox.top + 290
          }}
          animate={{
            x: bBox.right - 53,
            y: bBox.top + 290
          }}
          src='/flask.png'
          alt='flask'
        />
        <motion.img
          className='absolute select-none'
          initial={{
            x: bBox.right - 100,
            y: bBox.top + 340
          }}
          animate={{
            x: bBox.right + 150,
            y: bBox.top + 340
          }}
          src='/book.png'
          alt='book'
        />
        <motion.img
          className='absolute select-none'
          initial={{
            x: bBox.right - 100,
            y: bBox.bottom - 160
          }}
          animate={{
            x: bBox.right - 45,
            y: bBox.bottom - 140
          }}
          src='/microscope.png'
          alt='microscope'
        />
      </div>
      {/* Mobile */}
      <div className='block sm:hidden'>
        <motion.img
          className='absolute w-[9.375rem] select-none'
          animate={{
            x: [bBox.left, bBox.left - 37, bBox.left - 37],
            y: [bBox.top - 20, bBox.top - 150, bBox.top - 82],
            // @ts-ignore
            'z-index': [40, 1000, 1000, 1000]
          }}
          transition={{
            type: 'keyframes',
            damping: 5,
            stiffness: 100
          }}
          src='/hat.png'
          alt='hat'
        />
        <motion.img
          className='absolute w-[9.625rem] select-none'
          initial={{
            x: bBox.left + 120,
            y: bBox.top,
            scaleX: -1,
            rotate: 10
          }}
          animate={{
            x: bBox.left + bBox.width / 2 - 77,
            y: bBox.top - 105
          }}
          src='/crayons.png'
          alt='crayons'
        />
        <motion.img
          className='absolute w-[8.5rem] select-none'
          initial={{
            x: bBox.right - 90,
            y: bBox.top
          }}
          animate={{
            x: bBox.right - 90,
            y: bBox.top - 75
          }}
          src='/todo.png'
          alt='todo'
        />

        <motion.img
          className='absolute w-[11.75rem] select-none'
          animate={{
            x: [bBox.left, bBox.left - 65, bBox.left - 65],
            y: [bBox.bottom - 120, bBox.bottom + 15, bBox.bottom - 80],
            // @ts-ignore
            'z-index': [40, 1000, 1000, 1000]
          }}
          transition={{
            type: 'keyframes',
            damping: 5,
            stiffness: 100
          }}
          src='/leaf.png'
          alt='leaf'
        />
        <motion.img
          className='absolute w-[7.1875rem] select-none'
          initial={{
            x: bBox.left + bBox.width / 2 - 77,
            y: bBox.bottom - 120,
            scaleX: -1,
            rotate: 10
          }}
          animate={{
            x: bBox.left + bBox.width / 2 - 77,
            y: bBox.bottom - 23
          }}
          src='/compass.png'
          alt='compass'
        />
        <motion.img
          className='absolute w-[14.125rem] select-none'
          animate={{
            x: [bBox.right - 230, bBox.right - 178, bBox.right - 178],
            y: [bBox.bottom - 120, bBox.bottom + 15, bBox.bottom - 60],
            // @ts-ignore
            'z-index': [40, 1000, 1000, 1000]
          }}
          transition={{
            type: 'keyframes',
            damping: 5,
            stiffness: 100
          }}
          src='/book.png'
          alt='book'
        />
      </div>
    </>
  );
}
