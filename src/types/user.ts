import type { Timestamp } from 'firebase/firestore';

export interface UserProps {
  id: string;
  email: string;
  name: string;
  image?: string;
  providers: ('google' | 'github')[];
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}
