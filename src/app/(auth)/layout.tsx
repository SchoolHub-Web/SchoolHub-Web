'use client';

import FormInput from '@/components/form-input';
import PrimaryButton from '@/components/primary-button';
import Logo from '@/components/logo';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import LogoExpanded from '@/components/logo-expanded';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePathname, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import AnimatedTabs from '@/components/animated-tabs';
import { login, register } from '@/api/auth';
import { FloatingElements } from '@/components/floating-elements';

interface IFormInput {
  user: string;
  password: string;
}

export default function Page() {
  const formRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const router = useRouter();

  const isLogin = usePathname() === '/login';

  const schema = yup.object({
    user: yup.string().required('Username is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must have at least 8 characters'),
    repeatPassword: yup.string().when('password', {
      is: () => !isLogin,
      then: (schema) =>
        schema
          .required('Please repeat your password')
          .oneOf([yup.ref('password')], 'Passwords must match'),
      otherwise: (schema) => schema.notRequired()
    })
  });

  const {
    handleSubmit,
    register: registerForm,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    if (!isLogin) {
      const response = await register(data.user, data.password);

      if (response.code === 200) {
        toast({
          title: 'Account created successfully!'
        });

        router.push('/login');
      } else {
        toast({
          title: response.error
        });
      }
    } else {
      const response = await login(data.user, data.password);

      if (response.code === 200) {
        toast({
          title: 'Logged in successfully!'
        });

        router.push('/classbook');
      } else {
        toast({
          title: response.error
        });
      }
    }
  };

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
                register={registerForm('user')}
                error={errors.user?.message}
                placeholder='Email...'
                label='Email'
              />
              <FormInput
                register={registerForm('password')}
                error={errors.password?.message}
                placeholder='Password...'
                label='Password'
                password
              />
              {!isLogin && (
                <FormInput
                  register={registerForm('repeatPassword')}
                  error={errors.password?.message}
                  placeholder='Repeat password...'
                  label='Repeat password'
                  password
                />
              )}
            </div>
            <PrimaryButton
              onClick={handleSubmit(onSubmit)}
              type='submit'
              className='w-full'
            >
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
