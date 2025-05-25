export interface MemoProps {
  id: string;
  category: string;
  title: string;
  content: string;
}

export interface MemoListProps {
  memos: MemoProps[];
}
