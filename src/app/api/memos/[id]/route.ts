import { withAuth } from '@/lib/auth-middleware';
import { deleteMemo, getMemoById, updateMemo } from '@/lib/services/memo.service';
import { type NextRequest, NextResponse } from 'next/server';

export const GET = withAuth(async (req: NextRequest, { userId, params }) => {
  try {
    const { id } = await params!;

    if (!id) {
      return NextResponse.json({ error: 'Memo ID is required' }, { status: 400 });
    }

    const memo = await getMemoById(id, userId);

    if (!memo) {
      return NextResponse.json({ error: 'Memo not found' }, { status: 404 });
    }

    return NextResponse.json(memo);
  } catch (error) {
    console.error('Error fetching memo:', error);
    return NextResponse.json({ error: 'Failed to fetch memo' }, { status: 500 });
  }
});

// PUT /api/memos/[id]
export const PUT = withAuth(async (req: NextRequest, { userId, params }) => {
  try {
    const { id } = await params!;
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'Memo ID is required' }, { status: 400 });
    }

    const { title, content, category } = body;

    if (!(title || content)) {
      return NextResponse.json({ error: 'Title or Content is required' }, { status: 400 });
    }

    await updateMemo(id, { title, content, category: category || 'others' }, userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating memo:', error);
    return NextResponse.json({ error: 'Failed to update memo' }, { status: 500 });
  }
});

// DELETE /api/memos/[id]
export const DELETE = withAuth(async (req: NextRequest, { userId, params }) => {
  try {
    const { id } = await params!;

    if (!id) {
      return NextResponse.json({ error: 'Memo ID is required' }, { status: 400 });
    }

    await deleteMemo(id, userId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting memo:', error);
    return NextResponse.json({ error: 'Failed to delete memo' }, { status: 500 });
  }
});
