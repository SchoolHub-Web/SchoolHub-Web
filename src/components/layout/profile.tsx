'use client';

import { useRouter } from 'next/navigation';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react';
import { logout } from '@/api/auth';
import { CircleUser } from 'lucide-react';

export default function Profile({ className = '' }: { className?: string }) {
  const router = useRouter();

  return (
    <div className={`flex justify-end ${className} cursor-pointer`}>
      <Dropdown>
        <DropdownTrigger>
          <span className='fa fa-circle-user text-4xl' />
        </DropdownTrigger>
        <DropdownMenu aria-label='Static Actions'>
          <DropdownItem href='/profile' key='new'>
            Profile
          </DropdownItem>
          <DropdownItem
            onClick={async () => {
              await logout();
              router.push('/login');
            }}
            key='delete'
            className='text-danger'
            color='danger'
          >
            Log out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
