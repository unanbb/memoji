import { createMemo } from '@/lib/services/memo.service';
import type { MemoProps } from '@/types/memo';

export async function initializeNewUser(userId: string): Promise<void> {
  try {
    await createTutorialMemo(userId);
  } catch (error) {
    console.error('Failed to initialize new user:', error);
    throw error;
  }
}

async function createTutorialMemo(userId: string): Promise<MemoProps> {
  const tutorialMemo = {
    title: '🎉 메모지에 오신 것을 환영합니다!',
    content: `안녕하세요! 메모지를 사용해주셔서 감사합니다.

## 📝 메모지 사용법

### 1. 메모 작성하기
- 우측 하단의 **+** 버튼을 클릭하여 새로운 메모를 작성할 수 있습니다.
- 제목과 내용을 입력하고 카테고리를 선택해주세요.

### 2. 카테고리 관리
- 메모를 카테고리별로 정리할 수 있습니다.
- 새로운 카테고리는 메모 작성 시 자동으로 생성됩니다.

### 3. 메모 검색
- 상단의 검색바를 통해 메모를 빠르게 찾을 수 있습니다.

### 4. 메모 편집 및 삭제
- 메모를 클릭하여 편집할 수 있습니다.
- 휴지통 아이콘을 클릭하여 메모를 삭제할 수 있습니다.

---

이 튜토리얼 메모는 언제든지 삭제하셔도 됩니다. 즐거운 메모 생활 되세요! ✨`,
    category: 'others',
  };

  return await createMemo(tutorialMemo, userId);
}
