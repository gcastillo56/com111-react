import { createContext, useContext, useState } from 'react';

type PostContextType = {
    posts: any;
    getPosts: () => [];
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: React.ReactNode }) => {
    const [posts, setPosts] = useState<any>([]);

    const getPosts = () =>{
        return posts;
    }

    return(
        <PostContext.Provider value={{posts, getPosts}}> {children} </PostContext.Provider>
    );
}