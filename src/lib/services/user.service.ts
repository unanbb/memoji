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
  const userRef = doc(db, 'users', userData.id);
  const userDoc = await getDoc(userRef);

  const now = Timestamp.now();

  // TODO: 이미 다른 provider로 가입한 유저라면 에러 처리 필요
  if (userDoc.exists() && userDoc.data().provider !== userData.provider) {
    throw new Error('User already exists with a different provider');
  }

  if (userDoc.exists()) {
    const existingUser = userDoc.data() as UserProps;
    const updatedUser = {
      ...existingUser,
      ...userData,
      updatedAt: now,
    };

    await setDoc(userRef, updatedUser);
    return updatedUser;
  } else {
    const newUser: UserProps = {
      ...userData,
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
