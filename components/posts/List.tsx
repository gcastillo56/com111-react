import PostListItem from '@/components/posts/ListItem';
import { useState, useEffect } from 'react';
import { usePostContext } from "@/context/postContext";

export default function PostsList() {
  const [isLoading, setIsLoading] = useState(true);
  const SIMULATED_DELAY = 3000;
  const { posts, userName } = usePostContext();
  const [myPosts, setMyPosts] = useState([]);

  // NOTE: This is a simulated delay to observe the loading component
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, SIMULATED_DELAY);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMyPosts(posts.filter((post: any) => post.author.name === userName ));
  }, [posts]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2 min-h-[200px]">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading 2...</p>
        </div>
      ) : (
        <>
          {myPosts.length === 0 ? (
            <p className="text-gray-600">No posts available.</p>
          ) : (
            <ul className="space-y-6 w-full max-w-4xl mx-auto">
              {myPosts.map((post: any) => (<PostListItem key={post.id} post={post} />))}
            </ul>
          )}
        </>
      )}
    </>
  );
}