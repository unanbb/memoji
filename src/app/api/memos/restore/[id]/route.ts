import { withAuth } from '@/lib/auth-middleware';
import { undoDeleteMemo } from '@/lib/services/memo.service';
import { type NextRequest, NextResponse } from 'next/server';

export const POST = withAuth(async (req: NextRequest, { userId, params }) => {
  try {
    const { id } = await params!;
    const restoredMemo = await undoDeleteMemo(id, userId);
    return NextResponse.json({
      success: true,
      memo: restoredMemo,
    });
  } catch (error) {
    console.error('메모 복원중 에러 발생:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: '메모 복원중 알 수 없는 오류 발생' }, { status: 500 });
  }
});
