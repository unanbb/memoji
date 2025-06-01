import { z } from 'zod';

export const categorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, '카테고리 이름은 필수입니다'),
  createdAt: z.date(),
});

export const createCategorySchema = z.object({
  name: z.string().min(1, '카테고리 이름은 필수입니다'),
});

export interface CategoryProps {
  id: string;
  name: string;
  createdAt: Date;
}

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
