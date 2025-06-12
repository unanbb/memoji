'use server';

import type { MemoProps } from '@/types/memo';

export const fetchCreateMemo = async (memoData: Omit<MemoProps, 'id' | 'createdAt'>) => {
  try {
    const response = await fetch(`http://localhost:3000/api/memos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(memoData),
    });

    if (!response.ok) {
      throw new Error('메모 생성에 실패했습니다.');
    }
    return response.json();
  } catch (error) {
    console.error('메모 생성 중 오류 발생:', error);
  }
};

export const fetchCreateCategory = async (category: { category: string }) => {
  try {
    const response = await fetch(`http://localhost:3000/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });

    if (!response.ok) {
      throw new Error('카테고리 생성에 실패했습니다.');
    }

    console.log(`새 카테고리 생성! : ${category}`);
  } catch (error) {
    console.error('카테고리 생성 중 오류 발생:', error);
    throw new Error('카테고리 생성 중 오류가 발생했습니다.');
  }
};

export const fetchDeleteCategory = async (categoryName: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/categories/${encodeURIComponent(categoryName)}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error('카테고리 삭제에 실패했습니다.');
    }

    console.log(`카테고리 ${categoryName} 삭제 성공!`);
  } catch (error) {
    console.error('카테고리 삭제 중 오류 발생: ', error);
    throw new Error('카테고리 삭제 중 오류가 발생했습니다.');
  }
};

export const fetchModifyCategory = async (categoryName: string, newCategoryName: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/categories/${encodeURIComponent(categoryName)}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newName: newCategoryName,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('카테고리 수정에 실패했습니다.');
    }

    console.log(`카테고리명 수정 성공! ${categoryName} -> ${newCategoryName}`);
  } catch (error) {
    console.error('카테고리 수정 중 오류 발생: ', error);
    throw new Error('카테고리 수정 중 오류가 발생했습니다.');
  }
};
