'use client';

import { Input } from '@nextui-org/input';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function FormInput({
  placeholder,
  label,
  password = false,
  register,
  error,
  disabled = false
}: {
  placeholder: string;
  label: string;
  password?: boolean;
  register: any;
  error?: string;
  disabled?: boolean;
}) {
  const [hidden, setHidden] = useState(true);

  return (
    <motion.div layout>
      <Input
        disabled={disabled}
        {...register}
        autoComplete='new-password'
        classNames={{
          label: 'text-black font-semibold text-base hidden sm:block',
          inputWrapper: 'rounded-full shadow-none',
          base: '!mt-0 sm:!mt-[calc(theme(fontSize.small)_+_10px)]'
        }}
        type={password && hidden ? 'password' : 'text'}
        labelPlacement='outside'
        label={label}
        placeholder={placeholder}
        endContent={
          password ? (
            <button className='focus:outline-none' type='button'>
              <i
                className={`fa ${hidden ? 'fa-eye-slash' : 'fa-eye'}`}
                onClick={() => {
                  setHidden(!hidden);
                }}
              />
            </button>
          ) : (
            ''
          )
        }
      />
      {error && (
        <label className='text-sm leading-tight text-red-500'>{error}</label>
      )}
    </motion.div>
  );
}
