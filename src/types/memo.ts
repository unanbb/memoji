import { Timestamp } from 'firebase/firestore/lite';

export interface MemoCardProps {
  id: string;
  title: string;
  content: string;
}

export interface MemoProps extends MemoCardProps {
  category: string;
  createdAt: Timestamp;
}

export interface MemoListProps {
  memos: MemoProps[];
}

export type MemoCardData = Omit<MemoProps, 'id'>;
