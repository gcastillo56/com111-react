'use client';
import { Suspense } from 'react';
import PostsList from '@/components/posts/List';

export default function Posts() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-8">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-3 text-gray-600">Loading page 1...</p>
          </div>
        }
      >
        <PostsList />
      </Suspense>
    </div>
  ); 
}
