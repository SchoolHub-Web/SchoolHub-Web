'use client';

import FormInput from '@/components/form-input';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PrimaryButton from '@/components/primary-button';
import { updateProfile } from '@/api/user';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@nextui-org/checkbox';
import { cn } from '@/lib/utils';

interface IFormInput {
  email: string;
  NICUser: string;
  NICPassword?: string;
  GeminiKey?: string;
  useNIC: boolean;
}

interface ProfileFormProps {
  defaultValues?: Partial<IFormInput>;
}

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  NICUser: yup.string().required('NIC user is required'),
  NICPassword: yup.string(),
  GeminiKey: yup.string(),
  useNIC: yup.boolean().required()
});

export function ProfileForm({ defaultValues }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: defaultValues?.email ?? '',
      NICUser: defaultValues?.NICUser ?? '',
      NICPassword: '',
      GeminiKey: '',
      useNIC: false
    }
  });

  const toast = useToast();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await updateProfile({
      email: data.email,
      NICUser: data.NICUser,
      NICPassword: data.NICPassword === '' ? undefined : data.NICPassword,
      GeminiKey: data.GeminiKey === '' ? undefined : data.GeminiKey
    });

    toast.toast({
      title: 'Profile updated successfully'
    });
  };

  return (
    <main className='flex w-full flex-col items-center justify-center pt-5'>
      <div className='flex w-full max-w-[50rem] flex-col items-center rounded-[1.25rem] bg-white/60 p-[1.875rem]'>
        <h1 className='text-5xl font-semibold'>Profile</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex w-full flex-col gap-4 pt-8'
        >
          <FormInput
            placeholder='Email...'
            label='Email'
            register={register('email')}
            error={errors.email?.message}
          />
          <Checkbox {...register('useNIC')}>Use NIC</Checkbox>
          <div
            className={cn(
              'flex flex-col gap-4',
              !watch('useNIC') && 'opacity-60'
            )}
          >
            <FormInput
              disabled={!watch('useNIC')}
              placeholder='NIC User...'
              label='NoteInCatalog User'
              register={register('NICUser')}
              error={errors.NICUser?.message}
            />
            <FormInput
              disabled={!watch('useNIC')}
              placeholder='NIC Password...'
              label='NoteInCatalog Password'
              register={register('NICPassword')}
              error={errors.NICPassword?.message}
              password
            />
          </div>
          <FormInput
            placeholder='Gemini Key...'
            label='Gemini API Key'
            register={register('GeminiKey')}
            error={errors.GeminiKey?.message}
            password
          />
          <PrimaryButton type='submit' className='w-full'>
            Save
          </PrimaryButton>
        </form>
      </div>
    </main>
  );
}
