import { db } from '@/lib/firebase';
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
} from 'firebase/firestore';

export async function createCategory(name: string): Promise<string> {
  const createdAt = Timestamp.now();
  const newDocRef = await addDoc(collection(db, 'categories'), {
    name,
    createdAt,
  });
  return newDocRef.id;
}

export async function createCategoryIfNotExists(name: string): Promise<string> {
  try {
    const categoryName = !name || name.trim() === '' ? 'others' : name;

    const q = query(collection(db, 'categories'), where('name', '==', categoryName));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      return snapshot.docs[0].id;
    }

    return await createCategory(categoryName);
  } catch (error) {
    console.error('Error creating category if not exists:', error);
    throw new Error('Failed to create category');
  }
}

export async function getCategoryById(id: string): Promise<string | null> {
  try {
    const snapshot = await getDoc(doc(collection(db, 'categories'), id));
    if (!snapshot.exists()) {
      return null;
    }
    return snapshot.data().name || null;
  } catch (error) {
    console.error('Error fetching category by id:', error);
    throw new Error('Failed to fetch category by id');
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const categoriesRef = collection(db, 'categories');
    const q = query(categoriesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return data.name || '';
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
}

export async function getCategoryMap(): Promise<Map<string, string>> {
  try {
    const querySnapshot = await getDocs(collection(db, 'categories'));
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

export async function updateCategoryName(id: string, newName: string): Promise<void> {
  try {
    const categoryDocRef = doc(collection(db, 'categories'), id);
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

export async function getCategoryByName(name: string): Promise<string | null> {
  try {
    const q = query(collection(db, 'categories'), where('name', '==', name));
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

export async function getCategoryIdByName(name: string): Promise<string | null> {
  try {
    const q = query(collection(db, 'categories'), where('name', '==', name));
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

export async function isCategoryExists(name: string): Promise<boolean> {
  try {
    const category = await getCategoryByName(name);
    return category !== null;
  } catch (error) {
    console.error('Error checking category existence:', error);
    throw new Error('Failed to check category existence');
  }
}

export async function deleteCategory(categoryId: string): Promise<void> {
  try {
    await deleteDoc(doc(collection(db, 'categories'), categoryId));
  } catch (error) {
    console.error('카테고리 삭제 중 오류 발생:', error);
    throw new Error('카테고리 삭제에 실패했습니다. 다시 시도해주세요.');
  }
}
