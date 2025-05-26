export interface MemoCardProps {
  id: string;
  title: string;
  content: string;
}

export interface MemoProps extends MemoCardProps {
  category: string;
}

export interface MemoListProps {
  memos: MemoProps[];
}
