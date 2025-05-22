export interface MemoProps {
  id: string;
  title: string;
  content: string;
}

export interface MemoListProps {
  memos: MemoProps[];
}
