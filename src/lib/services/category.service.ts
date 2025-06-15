import { db } from '@/lib/firebase';
import type { CategoryItem } from '@/types/category';
import { validateCategoryName } from '@/utils/validateCategoryName';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';

export async function createCategoryIfNotExists(name: string, userId: string): Promise<string> {
  try {
    if (!validateCategoryName(name)) {
      throw new Error('Invalid category name');
    }
    const categoryName = name.trim() || 'others';
    return await runTransaction(db, async transaction => {
      const newDocRef = doc(db, 'users', userId, 'categories', categoryName);
      const snapshot = await transaction.get(newDocRef);
      if (snapshot.exists()) {
        return newDocRef.id;
      }
      transaction.set(newDocRef, { name: categoryName, createdAt: Timestamp.now() });
      return newDocRef.id;
    });
  } catch (error) {
    console.error('Error creating category if not exists:', error);
    throw error;
  }
}

export async function getCategories(userId: string): Promise<CategoryItem[]> {
  try {
    const categoriesRef = collection(db, 'users', userId, 'categories');
    const categorySnapshot = await getDocs(categoriesRef);
    const memoSnapshot = await getDocs(collection(db, 'users', userId, 'memos'));

    const memoCounts = new Map<string, number>();
    memoSnapshot.docs.forEach(memoDoc => {
      const data = memoDoc.data();
      const categoryId = data.categoryId;
      if (categoryId && !data.isDeleted) {
        memoCounts.set(categoryId, (memoCounts.get(categoryId) || 0) + 1);
      }
    });

    return categorySnapshot.docs
      .map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          memoCount: memoCounts.get(doc.id) || 0,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
}

export async function getCategoryMap(userId: string): Promise<Map<string, string>> {
  try {
    const categoriesRef = collection(db, 'users', userId, 'categories');
    const querySnapshot = await getDocs(categoriesRef);
    const map = new Map<string, string>();
    querySnapshot.forEach(doc => {
      const data = doc.data();
      map.set(doc.id, data.name || '');
    });
    return map;
  } catch (error) {
    console.error('Error fetching category map:', error);
    throw new Error('Failed to fetch category map');
  }
}

export async function getCategoryById(id: string, userId: string): Promise<string | null> {
  try {
    const categoriesRef = collection(db, 'users', userId, 'categories');
    const snapshot = await getDoc(doc(categoriesRef, id));
    if (!snapshot.exists()) {
      return null;
    }
    return snapshot.data().name || null;
  } catch (error) {
    console.error('Error fetching category by id:', error);
    throw new Error('Failed to fetch category by id');
  }
}

export async function updateCategoryName(
  id: string,
  newName: string,
  userId: string,
): Promise<void> {
  try {
    const categoryDocRef = doc(collection(db, 'users', userId, 'categories'), id);
    const categorySnapshot = await getDoc(categoryDocRef);
    if (!categorySnapshot.exists()) {
      throw new Error('Category does not exist');
    }
    await setDoc(categoryDocRef, { name: newName }, { merge: true });
  } catch (error) {
    console.error('Error updating category name:', error);
    throw new Error('Failed to update category name');
  }
}

// const docSnapshot = await getDoc(doc(memosRef, id));

export async function getCategoryByName(name: string, userId: string): Promise<string | null> {
  try {
    const q = query(collection(db, 'users', userId, 'categories'), where('name', '==', name));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return null;
    }
    return snapshot.docs[0].data().name || null;
  } catch (error) {
    console.error('Error fetching category by name:', error);
    throw new Error('Failed to fetch category by name');
  }
}

export async function getCategoryIdByName(name: string, userId: string): Promise<string | null> {
  try {
    const q = query(collection(db, 'users', userId, 'categories'), where('name', '==', name));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return null;
    }
    return snapshot.docs[0].id;
  } catch (error) {
    console.error('Error fetching category id by name:', error);
    throw new Error('Failed to fetch category id by name');
  }
}

export async function isCategoryExists(name: string, userId: string): Promise<boolean> {
  try {
    const category = await getCategoryByName(name, userId);
    return category !== null;
  } catch (error) {
    console.error('Error checking category existence:', error);
    throw new Error('Failed to check category existence');
  }
}

export async function deleteCategory(categoryId: string, userId: string): Promise<void> {
  try {
    await deleteDoc(doc(collection(db, 'users', userId, 'categories'), categoryId));
  } catch (error) {
    console.error('카테고리 삭제 중 오류 발생:', error);
    throw new Error('카테고리 삭제에 실패했습니다. 다시 시도해주세요.');
  }
}
