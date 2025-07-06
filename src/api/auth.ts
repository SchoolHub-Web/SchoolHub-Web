'use server';

import { db } from '@/db/db';
import { firstRow } from '@/lib/db-utils';
import { compare, hash } from 'bcrypt';
import { eq } from 'drizzle-orm';
import { sign, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import envConfig from '../../env.config';
import { users } from '@/db/schema/users';

const SALT_ROUNDS = 10;

export async function login(email: string, password: string) {
  const user = await firstRow(
    db
      .select({
        id: users.id,
        password: users.password
      })
      .from(users)
      .where(eq(users.email, email))
  );

  if (user && (await compare(password, user.password))) {
    cookies().set(
      'session',
      sign(
        JSON.stringify({
          id: user.id
        }),
        envConfig.JWT_SECRET
      ),
      {
        httpOnly: true,
        secure: false
      }
    );

    return {
      code: 200
    };
  }

  return {
    error: 'Invalid credentials',
    code: 401
  };
}

export async function register(email: string, password: string) {
  try {
    await db.insert(users).values({
      email,
      password: await hash(password, SALT_ROUNDS)
    });
  } catch (error) {
    console.log(error);

    return {
      code: 409,
      error: 'Email already exists'
    };
  }

  return {
    code: 200
  };
}

export async function logout() {
  cookies().delete('session');
}

interface JWTPayload {
  id: number;
}

export async function isLogged(): Promise<JWTPayload | false> {
  const token = cookies().get('session')?.value;

  if (!token) {
    return false;
  }

  try {
    return verify(token, envConfig.JWT_SECRET) as JWTPayload;
  } catch (e) {
    return false;
  }
}
