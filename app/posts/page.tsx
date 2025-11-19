'use client';
import Post from '@/components/Post';
import { useState, useEffect, Suspense } from 'react';
import { usePostContext } from "@/context/postContext";

function PostsList() {
  const [isLoading, setIsLoading] = useState(true);
  const SIMULATED_DELAY = 3000;
  const { posts, userName } = usePostContext();
  // NOTE: Before we had this dummy post. Now we will filter the posts here to be only the ones that 
  // the author is the userName. For this reason we will also use a local state variable to render it
  // via a useEffect.
  // const posts = [{ ... }]; // Replace with actual posts data
  const [myPosts, setMyPosts] = useState([]);

  // NOTE: This is a simulated delay to observe the loading component
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, SIMULATED_DELAY);
    return () => clearTimeout(timer);
  }, []);

  // NOTE: With post being the observed condition I can refresh them whenever there is a new post
  // added to the set. Here is also where I filter all the posts to only include the posts owned
  // by my userName.
  useEffect(() => {
    setMyPosts(posts.filter((post: any) => post.author.name === userName ));
  }, [posts]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2 min-h-[200px]">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : (
        <>
          {myPosts.length === 0 ? (
            <p className="text-gray-600">No posts available.</p>
          ) : (
            <ul className="space-y-6 w-full max-w-4xl mx-auto">
              {myPosts.map((post: any) => (<Post key={post.id} post={post} />))}
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
            <p className="ml-3 text-gray-600">Loading page...</p>
          </div>
        }
      >
        <PostsList />
      </Suspense>
    </div>
  ); 
}
