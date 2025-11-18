'use client';
import Post from '@/components/Post';
import React, { useState, useEffect, Suspense } from 'react';


function PostsList() {
  const [isLoading, setIsLoading] = useState(true);
  const SIMULATED_DELAY = 3000;
  const posts = [{ "id": 0,
            "title": "No Posts",
            "author": { "name" : "" },
            "createdAt": "2025-11-04 12:00:00",
            "content": "No posts available at the moment."
        }]; // Replace with actual posts data

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, SIMULATED_DELAY);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2 min-h-[200px]">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading2...</p>
        </div>
      ) : (
        <>
          {posts.length === 0 ? (
            <p className="text-gray-600">No posts available.</p>
          ) : (
            <ul className="space-y-6 w-full max-w-4xl mx-auto">
              {posts.map((post) => (<Post key={post.id} post={post} />))}
            </ul>
          )}
        </>
      )}
    </>
  );
}

export default function Posts() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-8">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-3 text-gray-600">Loading page1...</p>
          </div>
        }
      >
        <PostsList />
      </Suspense>
    </div>
  ); 
}
