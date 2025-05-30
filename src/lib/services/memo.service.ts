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
  deleteDoc,
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

  // 1. 메모를 생성하기 전에 해당 name이 있는 카테고리가 있는지 확인한다.
  // 2. 해당 name의 카테고리가 있으면 카테고리를 생성하지 않는다.
  // 3. 카테고리가 없으면 카테고리를 생성한다.
  // createCategoryIfNotExists 함수에서 위의 로직을 처리하고 카테고리 ID를 반환한다.
  const categoryId = await createCategoryIfNotExists(memo.category);

  // 4. 생성한 카테고리의 id값을 메모 데이터가 참조하도록 한다.
  const newDocRef = await addDoc(collection(db, 'memos'), {
    ...memo,
    categoryId,
    createdAt,
  });

  return {
    ...memo,
    createdAt,
    id: newDocRef.id,
  };
}

export async function getMemos(): Promise<MemoProps[]> {
  const memosRef = collection(db, 'memos');
  const q = query(memosRef, orderBy('createdAt', 'desc'));
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

export async function deleteMemo(id: string): Promise<void> {
  try {
    await deleteDoc(doc(collection(db, 'memos'), id));
  } catch (error) {
    console.error('메모 삭제 중 오류 발생:', error);
    throw new Error('메모 삭제에 실패했습니다. 다시 시도해주세요.');
  }
}

export async function updateMemo(
  id: string,
  memo: Omit<MemoProps, 'id' | 'createdAt'>,
): Promise<void> {
  const memoRef = doc(collection(db, 'memos'), id);

  await setDoc(memoRef, {
    ...memo,
    updatedAt: Timestamp.now(),
  });
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
