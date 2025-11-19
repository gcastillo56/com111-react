'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { fetchPosts, addPosts, deletePost } from "@/api/api";

type PostContextType = {
    posts: any;
    userName: string;                   
    addPost: (post: any) => void;       
    removePost: (postId: any) => void; 
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
    const [posts, setPosts] = useState<any>([]);
    const userName = 'Charles';

    useEffect(() =>{
        console.log("Fetching posts from backend");
        async function loadPosts() {
            const newPosts = await fetchPosts();
            console.log("Posts fetched:", newPosts);
            setPosts(newPosts);
        }
        loadPosts();
    },[]);

    const addPost = async (post: any) => { 
        const newPosts = await addPosts(post);
        setPosts([...newPosts]) 
    }

    const removePost = async (postId: any) => {
        const newPosts = await deletePost(postId);
        setPosts([...newPosts])
    }

    return(
        <PostContext.Provider value={{posts, userName, addPost, removePost}}> {children} </PostContext.Provider>
    );
}

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error('usePostContext must be used within PostContext');
  return context;
};