import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

export const memoCardSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
});

export const memoSchema = memoCardSchema.extend({
  category: z.string().default('others'),
  createdAt: z.instanceof(Timestamp),
});

export const memoListSchema = z.object({
  memos: z.array(memoSchema),
});

export const createMemoSchema = z.object({
  title: z.string().min(1, '제목은 필수입니다'),
  content: z.string().min(1, '내용은 필수입니다'),
  category: z.string().default('others'),
});

export const updateMemoSchema = memoCardSchema.extend({
  title: z.string(),
  content: z.string(),
  category: z.string().default('others'),
});

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
  memos: Omit<MemoProps, 'createdAt'>[];
}

export type MemoCardData = Omit<MemoProps, 'id'>;

export type CreateMemoInput = z.infer<typeof createMemoSchema>;
