import { db } from '@/lib/firebase';
import { Timestamp, addDoc, collection } from 'firebase/firestore';

export async function createCategory(name: string): Promise<string> {
  const createdAt = Timestamp.now();
  const newDocRef = await addDoc(collection(db, 'categories'), {
    name,
    createdAt,
  });
  return newDocRef.id;
}
