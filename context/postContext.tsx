'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { fetchPosts } from "@/api/api";

type PostContextType = {
    posts: any;
    userName: string;       // NOTE: We will move the user info to the context to use it also across routes
    // getPosts: () => [];  // NOTE: This is a redundant method since we can get posts directly from the context
    addPost: (post: any) => void;   // NOTE: We add a method to update our local posts
    // refresh: () => void; // NOTE: It could be wise to implement a refresh method to sync with backend.
                            // But we will not implement it now.
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
    const [posts, setPosts] = useState<any>([]);
    const userName = 'Charles';

    // NOTE: Load the posts from the backend when the context is loaded.
    // *** This code used to be in app/page.tsx ***
    useEffect(() =>{
        console.log("Fetching posts from backend");
        async function loadPosts() {
            const newPosts = await fetchPosts();
            console.log("Posts fetched:", newPosts);
            setPosts(newPosts);
        }
        loadPosts();
    },[]);

    const addPost = (post: any) => { setPosts([...posts, post])}

    // const getPosts = () => { return posts; }

    // NOTE: Observe how we updated the value content by removin getPosts and added username + addPost
    return(
        <PostContext.Provider value={{posts, userName, addPost}}> {children} </PostContext.Provider>
    );
}

// NOTE: Added the hook to use the context when needed.
export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error('usePostContext must be used within PostContext');
  return context;
};