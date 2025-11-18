'use client';
import { useEffect, useState } from "react";
import { fetchPosts } from "@/api/api";

export default function Home() {
  const userName = 'Charles';
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() =>{
    console.log("Fetching posts from backend");
    async function loadPosts() {
      const newPosts = await fetchPosts();
      console.log("Posts fetched:", newPosts);
      setPosts(newPosts);
    }
    loadPosts();
  },[]);

  function Card({ post }: any) {
    const bgColor = post.author.name === userName ? "bg-red-50" : "bg-white";
    const renderIt = post.author.name === userName;
    return (
      <>
        { renderIt ? (
          <div className={`border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ${bgColor}`}>
            <h2 className="text-2xl font-semibold text-gray-900 group-hover:underline mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500">by {post.author ? post.author.name : "Anonymous"}</p>
            <p className="text-xs text-gray-400 mb-4">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div className="relative">
              <p className="text-gray-700 leading-relaxed line-clamp-2">{post.content || "No content available."}</p>
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-gray-50 to-transparent" />
            </div>
          </div>
          ):(
            <div className={`border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ${bgColor}`}>
              <h1>You have no access</h1>
            </div>
          )
        }
      </>
    );
  }

  const myPosts = posts && posts.length > 0 ? posts.map((post) => ( <Card post={post} /> )) : <p>No posts available.</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-24 px-8">
      <h1 className="text-5xl font-extrabold mb-12 text-[#333333]">Recent Posts</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl mb-8">
        {myPosts}  
      </div>
    </div>
  );
}
