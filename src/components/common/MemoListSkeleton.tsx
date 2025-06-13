'use client';
import { Skeleton } from '@/components/common/Skeleton';

export default function MemoListSkeleton() {
  return (
    <div>
      <Skeleton className="w-full h-10 mt-4" />
      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <Skeleton className="w-full h-64 mt-4" />
        <Skeleton className="w-full h-64 mt-4" />
        <Skeleton className="w-full h-64 mt-4" />
        <Skeleton className="w-full h-64 mt-4" />
        <Skeleton className="w-full h-64 mt-4" />
      </div>
      <Skeleton className="w-full h-10 mt-4" />
      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <Skeleton className="w-full h-64 mt-4" />
        <Skeleton className="w-full h-64 mt-4" />
        <Skeleton className="w-full h-64 mt-4" />
        <Skeleton className="w-full h-64 mt-4" />
        <Skeleton className="w-full h-64 mt-4" />
      </div>
      <Skeleton className="w-full h-10 mt-4" />
      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <Skeleton className="w-full h-64 mt-4" />
        <Skeleton className="w-full h-64 mt-4" />
        <Skeleton className="w-full h-64 mt-4" />
        <Skeleton className="w-full h-64 mt-4" />
        <Skeleton className="w-full h-64 mt-4" />
      </div>
      <Skeleton className="w-full h-10 mt-4" />
      <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <Skeleton className="w-full h-64 mt-4" />
        <Skeleton className="w-full h-64 mt-4" />
        <Skeleton className="w-full h-64 mt-4" />
        <Skeleton className="w-full h-64 mt-4" />
        <Skeleton className="w-full h-64 mt-4" />
      </div>
    </div>
  );
}
