import { db } from '@/lib/firebase';
import type { UserProps } from '@/types/user';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';

export async function createOrUpdateUser(userData: {
  id: string;
  email: string;
  name: string;
  image?: string;
  provider: 'google' | 'github';
}): Promise<UserProps> {
  const userRef = doc(db, 'users', userData.email);
  const userDoc = await getDoc(userRef);

  const now = Timestamp.now();

  if (userDoc.exists()) {
    const existingUser = userDoc.data() as UserProps;
    const updatedUser = {
      ...existingUser,
      name: userData.name,
      image: userData.image || existingUser.image,
      providers: Array.from(new Set([...existingUser.providers, userData.provider])),
      updatedAt: now,
    };

    await setDoc(userRef, updatedUser);
    return updatedUser;
  } else {
    const newUser: UserProps = {
      id: userData.email,
      email: userData.email,
      name: userData.name,
      image: userData.image,
      providers: [userData.provider],
      createdAt: now,
    };

    await setDoc(userRef, newUser);
    return newUser;
  }
}

export async function getUserById(id: string): Promise<UserProps | null> {
  const userRef = doc(db, 'users', id);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return userDoc.data() as UserProps;
  }

  return null;
}

export async function getUserByEmail(email: string): Promise<UserProps | null> {
  return getUserById(email);
}
