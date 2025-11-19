'use client'
import Card from "@/components/posts/Card";
import { usePostContext } from "@/context/postContext";


export default function Home() {
  const { posts, userName } = usePostContext();
  const myPosts = posts && posts.length > 0 ? posts.map((post: any) => ( <Card key={post.id} post={post} userName={userName} /> )) : <p>No posts available.</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-24 px-8">
      <h1 className="text-5xl font-extrabold mb-12 text-[#333333]">Recent Posts</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl mb-8">
        {myPosts}  
      </div>
    </div>
  );
}
