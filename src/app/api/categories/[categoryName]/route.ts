import {
  createCategoryIfNotExists,
  deleteCategory,
  getCategoryIdByName,
  isCategoryExists,
  updateCategoryName,
} from '@/lib/services/category.service';
import { removeCategoryAndUpdateMemos } from '@/lib/services/memo.service';
import { validateCategoryName } from '@/utils/validateCategoryName';
import { NextResponse } from 'next/server';

interface Params {
  categoryName: string;
}

// PUT 요청을 통해 카테고리 이름 수정
export async function PUT(req: Request, { params }: { params: Promise<Params> }) {
  try {
    const { categoryName } = await params;
    const body = await req.json();
    const { newName } = body;

    // 카테고리 존재 여부 확인
    const existingCategoryId = await getCategoryIdByName(categoryName);
    if (!existingCategoryId) {
      return NextResponse.json({ error: '해당 카테고리를 찾을 수 없습니다.' }, { status: 404 });
    }

    // 새 카테고리 이름 유효성 검사
    if (!validateCategoryName(newName) || typeof newName !== 'string') {
      return NextResponse.json({ error: '유효하지 않은 카테고리 이름입니다.' }, { status: 400 });
    }

    // 같은 이름의 카테고리가 이미 존재하는지 확인
    if ((await isCategoryExists(newName)) && categoryName !== newName) {
      return NextResponse.json({ error: '이미 존재하는 카테고리 이름입니다.' }, { status: 400 });
    }

    // 카테고리 이름 업데이트
    await updateCategoryName(existingCategoryId, newName);

    return NextResponse.json(
      { category: newName, message: '카테고리가 성공적으로 업데이트되었습니다.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error updating category:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: '카테고리 업데이트에 실패했습니다.' }, { status: 500 });
  }
}

// DELETE 요청을 통해 카테고리 삭제
export async function DELETE(_req: Request, { params }: { params: Promise<Params> }) {
  try {
    const { categoryName } = await params;

    // 1. 카테고리 존재 여부 확인
    const existingCategoryId = await getCategoryIdByName(categoryName);
    if (!existingCategoryId) {
      return NextResponse.json({ error: '해당 카테고리를 찾을 수 없습니다.' }, { status: 404 });
    }

    // 2. 'others' 카테고리인지 확인 (others는 삭제 불가)
    if (existingCategoryId.toLowerCase() === 'others') {
      return NextResponse.json(
        { error: "'others' 카테고리는 삭제할 수 없습니다." },
        { status: 400 },
      );
    }

    // 3. 'others' 카테고리의 ID 찾기
    const othersId = await createCategoryIfNotExists('others');
    if (!othersId) {
      return NextResponse.json(
        { error: "'others' 카테고리를 찾거나 생성할 수 없습니다." },
        { status: 500 },
      );
    }

    // 4. 해당 카테고리의 메모들을 'others' 카테고리로 이동
    await removeCategoryAndUpdateMemos(existingCategoryId, othersId);

    // 5. 카테고리 삭제
    await deleteCategory(existingCategoryId);

    return NextResponse.json(
      {
        message:
          "카테고리가 성공적으로 삭제되었습니다. 관련 메모는 'others' 카테고리로 이동되었습니다.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting category:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: '카테고리 삭제에 실패했습니다.' }, { status: 500 });
  }
}
