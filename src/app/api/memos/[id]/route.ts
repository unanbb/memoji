import { deleteMemo, getMemoById, updateMemo } from '@/lib/services/memo.service';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const memo = await getMemoById(id);
    if (!memo) {
      return NextResponse.json({ error: '메모를 찾을 수 없습니다.' }, { status: 404 });
    }
    return NextResponse.json(memo, { status: 200 });
  } catch (error) {
    console.error('Error fetching memo:', error);
    return NextResponse.json({ error: '메모를 가져오는 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const deletedId = await deleteMemo(id);
    return NextResponse.json(
      { message: '메모가 성공적으로 삭제되었습니다.', id: deletedId },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting memo:', error);
    return NextResponse.json({ error: '메모 삭제 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const body = await req.json();

    const updatedMemo = await updateMemo(id, body);
    if (!updatedMemo) {
      return NextResponse.json(
        { error: '메모를 업데이트할 수 없습니다. 메모가 존재하지 않거나 잘못된 데이터입니다.' },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { message: '메모가 성공적으로 업데이트되었습니다.', memo: updatedMemo },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error updating memo:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: '메모 업데이트 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
