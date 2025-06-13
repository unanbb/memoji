import { withAuth } from '@/lib/auth-middleware';
import {
  createCategoryIfNotExists,
  deleteCategory,
  getCategoryIdByName,
  isCategoryExists,
  updateCategoryName,
} from '@/lib/services/category.service';
import { removeCategoryAndUpdateMemos } from '@/lib/services/memo.service';
import { validateCategoryName } from '@/utils/validateCategoryName';
import { type NextRequest, NextResponse } from 'next/server';

export const PUT = withAuth<{ categoryName: string }>(
  async (req: NextRequest, { userId, params }) => {
    try {
      const { categoryName } = params!;
      const body = await req.json();
      const { newName } = body;

      const existingCategoryId = await getCategoryIdByName(categoryName, userId);
      if (!existingCategoryId) {
        return NextResponse.json({ error: '해당 카테고리를 찾을 수 없습니다.' }, { status: 404 });
      }

      if (!validateCategoryName(newName) || typeof newName !== 'string') {
        return NextResponse.json({ error: '유효하지 않은 카테고리 이름입니다.' }, { status: 400 });
      }

      if ((await isCategoryExists(newName, userId)) && categoryName !== newName) {
        return NextResponse.json({ error: '이미 존재하는 카테고리 이름입니다.' }, { status: 400 });
      }

      await updateCategoryName(existingCategoryId, newName, userId);

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
  },
);
export const DELETE = withAuth<{ categoryName: string }>(
  async (_req: NextRequest, { userId, params }) => {
    try {
      const { categoryName } = params!;

      const existingCategoryId = await getCategoryIdByName(categoryName, userId);
      if (!existingCategoryId) {
        return NextResponse.json({ error: '해당 카테고리를 찾을 수 없습니다.' }, { status: 404 });
      }

      if (categoryName.toLowerCase() === 'others') {
        return NextResponse.json(
          { error: "'others' 카테고리는 삭제할 수 없습니다." },
          { status: 400 },
        );
      }

      const othersId = await createCategoryIfNotExists('others', userId);
      if (!othersId) {
        return NextResponse.json(
          { error: "'others' 카테고리를 찾거나 생성할 수 없습니다." },
          { status: 500 },
        );
      }

      await removeCategoryAndUpdateMemos(existingCategoryId, othersId, userId);

      await deleteCategory(existingCategoryId, userId);

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
  },
);
