'use client';

import FormInput from '@/components/form-input';
import PrimaryButton from '@/components/primary-button';
import Logo from '@/components/logo';
import { motion } from 'framer-motion';
import { RefObject, useEffect, useRef, useState } from 'react';
import LogoExpanded from '@/components/logo-expanded';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import AnimatedTabs from '@/components/animated-tabs';

interface IFormInput {
  user: string;
  password: string;
}

export default function Page() {
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const schema = yup.object({
    user: yup.string().required('Username is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must have at least 8 characters'),
    repeatPassword: yup
      .string()
      .required('Please repeat your password')
      .oneOf([yup.ref('password')], 'Passwords must match')
  });
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    // try {
    //   const res = await api.post('/auth/login', {
    //     user: data.user,
    //     password: data.password
    //   });
    //   localStorage.setItem('session', res.data.token);
    //   document.cookie = `session=${res.data.token}; path=/`;
    //   api.get('/profile').then((res) => {
    //     if (res.data.role === 'student') {
    //       document.cookie = `role=student; path=/`;
    //       router.push('/student/classbook');
    //     } else if (res.data.role === 'teacher') {
    //       document.cookie = `role=teacher; path=/`;
    //       router.push('/teacher/assignments');
    //     }
    //   });
    // } catch (e) {
    //   toast({
    //     title: "Can't sign you in!"
    //   });
    // }
  };

  const isLogin = usePathname() === '/login';

  console.log(isLogin);

  const [canRender, setCanRender] = useState<boolean>(false);

  useEffect(() => {
    setCanRender(true);
  }, []);

  return (
    <main className='relative flex h-full w-full items-center justify-center overflow-hidden bg-secondary-200 px-5 sm:px-8'>
      <motion.div
        layout
        ref={formRef}
        className='relative z-50 flex w-full max-w-[40rem] flex-col items-center rounded-[2rem] bg-secondary-50/70 px-6 pb-12 pt-9 shadow-[0_0_75.9px_-2px_rgba(0,0,0,.2)] backdrop-blur-[17.5rem] sm:px-12 sm:pb-12'
      >
        <LogoExpanded className='hidden sm:block' />
        <Logo className='block sm:hidden' />
        <div className='flex w-full flex-col gap-6 pt-8'>
          <form
            className='flex w-full flex-col items-center gap-9'
            onSubmit={handleSubmit(onSubmit)}
          >
            <AnimatedTabs
              tabs={[
                {
                  title: 'Login',
                  icon: 'fa fa-user',
                  href: '/login'
                },
                {
                  title: 'Register',
                  icon: 'fa fa-arrow-right-to-bracket',
                  href: '/register'
                }
              ]}
            />
            <div className='flex w-full flex-col gap-4'>
              <FormInput
                register={register('user')}
                error={errors.user?.message}
                placeholder='Email...'
                label='Email'
              />
              <FormInput
                register={register('password')}
                error={errors.password?.message}
                placeholder='Password...'
                label='Password'
                password
              />
              {!isLogin && (
                <FormInput
                  register={register('repeatPassword')}
                  error={errors.password?.message}
                  placeholder='Repeat password...'
                  label='Repeat password'
                  password
                />
              )}
            </div>
            <PrimaryButton type='submit' className='w-full'>
              {isLogin ? 'Login' : 'Register'}
            </PrimaryButton>
          </form>
        </div>
      </motion.div>
      <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center'>
        <img
          className='w-[90%] select-none'
          src='/white-ellipse.svg'
          alt='ellipse'
        />
      </div>
      {canRender ? (
        <div className='absolute left-0 top-0 h-full w-full'>
          <FloatingElements originRef={formRef} />
        </div>
      ) : (
        ''
      )}
    </main>
  );
}

function FloatingElements({
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
