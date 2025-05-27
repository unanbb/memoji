import { NextResponse } from 'next/server';

import { collection, getDocs, query, addDoc, Timestamp, orderBy } from 'firebase/firestore';
import type { MemoCardData, MemoProps} from '@/types/memo';
import { createMemoSchema, memoListSchema } from '@/types/memo';
import { db } from '@/lib/firebase';

export async function GET() {
  try {
    const memosRef = collection(db, 'memos');
    const q = query(memosRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const memos: MemoProps[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        category: data.category,
        createdAt: Timestamp.fromDate(data.createdAt.toDate()),
      };
    });

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

    const memosRef = collection(db, 'memos');
    const memo: MemoCardData = {
      title,
      content,
      category,
      createdAt: Timestamp.now(),
    };

    const newDocRef = await addDoc(memosRef, memo);
    return NextResponse.json({ id: newDocRef.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating memo:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create memo' }, { status: 500 });
  }
}
