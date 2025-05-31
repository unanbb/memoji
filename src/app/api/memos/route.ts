import { NextResponse } from 'next/server';

import { createMemo, getMemos } from '@/lib/services/memo.service';
import { createMemoSchema, memoListSchema } from '@/types/memo';

export async function GET() {
  try {
    const memos = await getMemos();
    if (memos.length === 0) {
      return NextResponse.json({ memos: [] }, { status: 200 });
    }
    const validatedData = memoListSchema.parse({ memos });
    return NextResponse.json(validatedData, { status: 200 });
  } catch (error) {
    console.error('Error fetching memos:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Failed to fetch memos' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = createMemoSchema.parse(body);
    const { title, content, category } = validatedData;
    const newDocRef = await createMemo({
      title,
      content,
      category,
    });
    return NextResponse.json({ id: newDocRef.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating memo:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create memo' }, { status: 500 });
  }
}
