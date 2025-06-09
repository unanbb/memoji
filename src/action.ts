'use server';

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
    return response.json();
  } catch (error) {
    console.error('카테고리 생성 중 오류 발생:', error);
    throw new Error('카테고리 생성 중 오류가 발생했습니다.');
  }
};
