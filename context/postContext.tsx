'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { fetchPosts, addPost, deletePost, updatePost } from "@/api/api";

type PostContextType = {
    posts: any;
    userName: string;    
    setUser: (name: string) => void;    // NOTE: Add method to update the username from the login data               
    addUpdatePost: (post: any) => void;       
    removePost: (postId: any) => void; 
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
    const [posts, setPosts] = useState<any>([]);
    // NOTE: We will set the name of the user now, based on the login data
    const [userName, setUserName] = useState<string>('');

    useEffect(() =>{
        console.log("Fetching posts from backend");
        async function loadPosts() {
            const newPosts = await fetchPosts();
            console.log("Posts fetched:", newPosts);
            setPosts(newPosts);
        }
        loadPosts();
    },[]);

    const addUpdatePost = async (post: any) => { 
        // NOTE: We check if the post has already an id assigned.
        // Based on that we either edit or add
        const newPosts = await (post.id === -1 ? addPost(post) : updatePost(post));
        setPosts([...newPosts]) 
    }

    const removePost = async (postId: any) => {
        const newPosts = await deletePost(postId);
        setPosts([...newPosts])
    }

    // NOTE: Create the method that will set the value in the context variable
    const setUser = (name: string) => {
        setUserName(name);
    }

    return(
        <PostContext.Provider value={{posts, userName, addUpdatePost, removePost, setUser}}> {children} </PostContext.Provider>
    );
}

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error('usePostContext must be used within PostContext');
  return context;
};