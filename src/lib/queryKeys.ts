export const queryKeys = {
  memo: {
    lists: () => ['memos-list'] as const,
    detail: (id?: string) => ['memos-detail-item', id] as const,
  },
  category: {
    lists: () => ['categories-list'] as const,
    detail: (id?: string) => ['categories-detail', id] as const,
  },
} as const;
