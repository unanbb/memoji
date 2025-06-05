import { db } from '@/lib/firebase';
import {
  createCategoryIfNotExists,
  getCategoryById,
  getCategoryMap,
} from '@/lib/services/category.service';
import type { MemoProps } from '@/types/memo';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
  writeBatch,
} from 'firebase/firestore';

export async function createMemo(memo: Omit<MemoProps, 'id' | 'createdAt'>): Promise<MemoProps> {
  const createdAt = Timestamp.now();

  const categoryId = await createCategoryIfNotExists(memo.category);

  const newDocRef = await addDoc(collection(db, 'memos'), {
    ...memo,
    categoryId,
    createdAt,
    isDeleted: false,
  });

  return {
    ...memo,
    createdAt,
    id: newDocRef.id,
  };
}

export async function getMemos(): Promise<MemoProps[]> {
  const memosRef = collection(db, 'memos');
  const q = query(memosRef, orderBy('createdAt', 'desc'), where('isDeleted', '!=', true));
  const querySnapshot = await getDocs(q);
  const categoryMap = await getCategoryMap();

  return Promise.all(
    querySnapshot.docs.map(async doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        category: categoryMap.get(data.categoryId) || 'others',
        createdAt: Timestamp.fromDate(data.createdAt.toDate()),
      } as MemoProps;
    }),
  );
}

export async function getMemoById(id: string): Promise<MemoProps | null> {
  const memosRef = collection(db, 'memos');
  const docSnapshot = await getDoc(doc(memosRef, id));
  if (!docSnapshot.exists()) {
    return null;
  }
  const data = docSnapshot.data();
  return {
    id: docSnapshot.id,
    title: data.title,
    content: data.content,
    category: (await getCategoryById(data.categoryId)) || 'others',
    createdAt: Timestamp.fromDate(data.createdAt.toDate()),
  };
}

export async function deleteMemo(id: string) {
  try {
    // await deleteDoc(doc(collection(db, 'memos'), id));
    const memoRef = doc(collection(db, 'memos'), id);
    const docSnapshot = await getDoc(memoRef);
    if (!docSnapshot.exists()) {
      throw new Error('메모가 존재하지 않습니다.');
    }
    setDoc(
      memoRef,
      {
        isDeleted: true,
        deletedAt: Timestamp.now(),
      },
      { merge: true },
    );
    return id;
  } catch (error) {
    console.error('메모 삭제 중 오류 발생:', error);
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }
    return { success: false, message: '메모 삭제 중 알 수 없는 오류가 발생했습니다.' };
  }
}

export async function undoDeleteMemo(id: string): Promise<MemoProps> {
  const memoRef = doc(collection(db, 'memos'), id);
  const docSnapshot = await getDoc(memoRef);
  if (!docSnapshot.exists()) {
    throw new Error('메모가 존재하지 않습니다.');
  }
  await setDoc(memoRef, { isDeleted: false, deletedAt: null }, { merge: true });
  return docSnapshot.data() as MemoProps;
}

export async function updateMemo(id: string, memo: Omit<MemoProps, 'id' | 'createdAt'>) {
  const memoRef = doc(collection(db, 'memos'), id);

  const docSnapshot = await getDoc(memoRef);
  if (!docSnapshot.exists()) {
    throw new Error('메모가 존재하지 않습니다.');
  }
  const categoryId = await createCategoryIfNotExists(memo.category);

  await setDoc(
    memoRef,
    {
      ...memo,
      categoryId,
      updatedAt: Timestamp.now(),
    },
    { merge: true },
  );

  return {
    ...memo,
    id,
    category: memo.category,
  };
}
export async function removeCategoryAndUpdateMemos(
  categoryId: string,
  newCategoryId: string,
): Promise<void> {
  const memosRef = collection(db, 'memos');
  const q = query(memosRef, where('category', '==', categoryId));
  const querySnapshot = await getDocs(q);
  const batch = writeBatch(db);

  for (const docSnap of querySnapshot.docs) {
    const memoRef = doc(memosRef, docSnap.id);
    batch.update(memoRef, { category: newCategoryId });
  }

  await batch.commit();
}
