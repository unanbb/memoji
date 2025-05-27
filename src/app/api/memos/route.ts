import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, addDoc, Timestamp } from 'firebase/firestore';
import { MemoCardData, MemoProps } from '@/types/memo';

function formatKstTime(date: Date) {
  const kstTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return kstTime;
}

export async function GET() {
  try {
    const memosRef = collection(db, 'memos');
    const q = query(memosRef);
    const querySnapshot = await getDocs(q);
    const memos: MemoProps[] = querySnapshot.docs.map(doc => {
      const data = doc.data();

      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        category: data.category,
        createdAt: data.createdAt.toDate(),
      };
    });

    return NextResponse.json({ memos }, { status: 200 });
  } catch (error) {
    console.error('Error fetching memos:', error);
    return NextResponse.json({ error: 'Failed to fetch memos' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content, category } = await req.json();
    const memosRef = collection(db, 'memos');

    const timestamp = Timestamp.fromDate(formatKstTime(new Date()));

    const memo: MemoCardData = { title, content, category, createdAt: timestamp };
    const newDocRef = await addDoc(memosRef, memo);

    return NextResponse.json({ id: newDocRef.id }, { status: 201 });
  } catch (error) {
    console.error('Error creating memo:', error);
    return NextResponse.json({ error: 'Failed to create memo' }, { status: 500 });
  }
}
