export const queryKeys = {
  memo: {
    lists: () => ['memos-list'] as const,
    detail: (id: string) => ['memos-detail-item', id] as const,
    details: () => ['memos-detail-items'] as const,
  },
  category: {
    lists: () => ['categories-list'] as const,
    detail: (id: string) => ['categories-detail', id] as const,
    details: () => ['categories-detail-items'] as const,
  },
} as const;
