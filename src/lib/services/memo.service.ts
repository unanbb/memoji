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

export async function createMemo(
  memo: Omit<MemoProps, 'id' | 'createdAt'>,
  userId: string,
): Promise<MemoProps> {
  const createdAt = Timestamp.now();

  const categoryId = await createCategoryIfNotExists(memo.category, userId);

  const memosRef = collection(db, 'users', userId, 'memos');

  const newDocRef = await addDoc(memosRef, {
    title: memo.title,
    content: memo.content,
    categoryId,
    createdAt,
    isDeleted: false,
  });

  return {
    title: memo.title,
    content: memo.content,
    category: memo.category,
    createdAt,
    id: newDocRef.id,
  };
}

export async function getMemos(
  userId: string,
  options?: {
    search?: string;
    category?: string;
    sortBy?: 'createdAt' | 'updatedAt' | 'title';
    sortOrder?: 'asc' | 'desc';
  },
): Promise<MemoProps[]> {
  const { search, category, sortBy = 'createdAt', sortOrder = 'desc' } = options || {};

  const memosRef = collection(db, 'users', userId, 'memos');

  const queryConstraints = [orderBy(sortBy, sortOrder), where('isDeleted', '!=', true)];
  const categoryMap = await getCategoryMap(userId);

  if (category && category !== 'all') {
    const categoryId = Array.from(categoryMap.entries()).find(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, name]) => name === category,
    )?.[0];

    if (categoryId) {
      queryConstraints.push(where('categoryId', '==', categoryId));
    }
  }

  const q = query(memosRef, ...queryConstraints);
  const querySnapshot = await getDocs(q);

  let memos = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      content: data.content,
      category: categoryMap.get(data.categoryId) || 'others',
      createdAt: Timestamp.fromDate(data.createdAt.toDate()),
    } as MemoProps;
  });

  if (search && search.trim()) {
    const normalizedQuery = search.toLowerCase().trim();
    memos = memos.filter(
      memo =>
        memo.title.toLowerCase().includes(normalizedQuery) ||
        memo.content.toLowerCase().includes(normalizedQuery),
    );
  }

  return memos;
}

export async function getMemoById(id: string, userId: string): Promise<MemoProps | null> {
  const memosRef = collection(db, 'users', userId, 'memos');
  const docSnapshot = await getDoc(doc(memosRef, id));
  if (!docSnapshot.exists() || docSnapshot.data().isDeleted) {
    return null;
  }
  const data = docSnapshot.data();
  return {
    id: docSnapshot.id,
    title: data.title,
    content: data.content,
    category: (await getCategoryById(data.categoryId, userId)) || 'others',
    createdAt: Timestamp.fromDate(data.createdAt.toDate()),
  };
}

export async function deleteMemo(id: string, userId: string) {
  try {
    const memoRef = doc(collection(db, 'users', userId, 'memos'), id);
    const docSnapshot = await getDoc(memoRef);
    if (!docSnapshot.exists()) {
      throw new Error('메모가 존재하지 않습니다.');
    }
    await setDoc(
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
      throw error;
    }
    throw new Error('메모 삭제 중 알 수 없는 오류 발생');
  }
}

export async function undoDeleteMemo(id: string, userId: string): Promise<MemoProps> {
  try {
    const memoRef = doc(collection(db, 'users', userId, 'memos'), id);
    const docSnapshot = await getDoc(memoRef);
    if (!docSnapshot.exists()) {
      throw new Error('메모가 존재하지 않습니다.');
    }
    await setDoc(memoRef, { isDeleted: false, deletedAt: null }, { merge: true });
    return { ...docSnapshot.data(), id: docSnapshot.id } as MemoProps;
  } catch (error) {
    console.error('메모 복원 중 오류 발생:', error);
    throw error;
  }
}

export async function updateMemo(
  id: string,
  memo: Omit<MemoProps, 'id' | 'createdAt'>,
  userId: string,
) {
  const memoRef = doc(collection(db, 'users', userId, 'memos'), id);

  const docSnapshot = await getDoc(memoRef);
  if (!docSnapshot.exists()) {
    throw new Error('메모가 존재하지 않습니다.');
  }
  const categoryId = await createCategoryIfNotExists(memo.category, userId);

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
  userId: string,
): Promise<void> {
  const memosRef = collection(db, 'users', userId, 'memos');
  const q = query(memosRef, where('category', '==', categoryId));
  const querySnapshot = await getDocs(q);
  const batch = writeBatch(db);

  for (const docSnap of querySnapshot.docs) {
    const memoRef = doc(memosRef, docSnap.id);
    batch.update(memoRef, { category: newCategoryId });
  }

  await batch.commit();
}
