import { create } from 'zustand';

interface SearchStore {
  searchQuery: string;
  isLoading: boolean;
  isError: boolean;
  setSearchQuery: (query: string) => void;
  setIsLoading: (loading: boolean) => void;
  setIsError: (error: boolean) => void;
}

export const useSearchStore = create<SearchStore>(set => ({
  searchQuery: '',
  isLoading: false,
  isError: false,
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  setIsError: (error: boolean) => set({ isError: error }),
}));
