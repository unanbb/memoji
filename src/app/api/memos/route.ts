import { withAuth } from '@/lib/auth-middleware';
import { createMemo, getMemos } from '@/lib/services/memo.service';
import { type NextRequest, NextResponse } from 'next/server';

export const GET = withAuth(async (req: NextRequest, { userId }) => {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const sortBy = searchParams.get('sortBy') as 'createdAt' | 'updatedAt' | 'title';
    const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc';

    const memos = await getMemos(userId, {
      search: search || undefined,
      category: category || undefined,
      sortBy: sortBy || 'createdAt',
      sortOrder: sortOrder || 'desc',
    });

    return NextResponse.json(memos);
  } catch (error) {
    console.error('Error fetching memos:', error);
    return NextResponse.json({ error: 'Failed to fetch memos' }, { status: 500 });
  }
});

export const POST = withAuth(async (req: NextRequest, { userId }) => {
  try {
    const body = await req.json();
    const { title, content, category } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const memo = await createMemo({ title, content, category: category || 'others' }, userId);

    return NextResponse.json(memo, { status: 201 });
  } catch (error) {
    console.error('Error creating memo:', error);
    return NextResponse.json({ error: 'Failed to create memo' }, { status: 500 });
  }
});
