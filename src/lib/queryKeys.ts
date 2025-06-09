export const queryKeys = {
  memo: {
    all: ['memos'] as const,
    lists: () => [...queryKeys.memo.all, 'list'] as const,
    list: (filters: string) => [...queryKeys.memo.lists(), { filters }] as const,
    details: () => [...queryKeys.memo.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.memo.details(), id] as const,
  },

  category: {
    all: ['categories'] as const,
    lists: () => [...queryKeys.category.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.category.all, 'detail', id] as const,
  },
} as const;
