import { ProfileForm } from '@/components/forms/profile-form';
import { getUserProfile } from '@/api/user';

export default async function () {
  const profile = await getUserProfile();

  if (!profile) {
    return null;
  }

  // @ts-ignore
  return <ProfileForm defaultValues={profile!} />;
}
