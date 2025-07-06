'use server';

import { db } from '@/db/db';
import { users } from '@/db/schema/users';
import { isLogged } from '@/api/auth';
import { eq } from 'drizzle-orm';
import { firstRow } from '@/lib/db-utils';

export async function getUserProfile() {
  const account = await isLogged();

  if (!account) {
    return false;
  }

  const profile = (await firstRow(
    db.select().from(users).where(eq(users.id, account.id))
  ))!;

  return {
    ...profile
  };
}

export interface UpdateProfileDto {
  email?: string;
  NICUser?: string;
  NICPassword?: string;
  GeminiKey?: string;
}

export async function updateProfile(updateProfileDto: UpdateProfileDto) {
  const account = await isLogged();

  if (!account) {
    return false;
  }

  await db
    .update(users)
    .set({
      email: updateProfileDto.email,
      NICUser: updateProfileDto.NICUser,
      NICPassword: updateProfileDto.NICPassword,
      GeminiKey: updateProfileDto.GeminiKey
    })
    .where(eq(users.id, account.id));

  return {
    code: 200
  };
}
