'use client';
import { Skeleton } from '@/components/common/Skeleton';

export default function MemoEditorSkeleton() {
  return (
    <div className="flex flex-col h-full space-y-4 p-4">
      <div className="mb-2 mt-2">
        <Skeleton className="w-full h-10" />
      </div>

      <div className="mb-4 relative">
        <div className="flex items-center space-x-2">
          <Skeleton className="flex-1 h-10" />
          <Skeleton className="w-10 h-10" />
        </div>
      </div>

      <div className="flex-1">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="absolute top-1 right-1 flex space-x-2">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
}
