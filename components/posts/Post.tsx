'use client'
import { notFound, useRouter } from "next/navigation";
import { usePostContext } from "@/context/postContext";
import { useState } from "react";
import EditPost from "./Editable";

export default function Post({ postId }: { postId: number }) {
    // NOTE: Just for readability I take the style of the buttons to this variable
    const buttonStyle = "w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out mb-12";
    const router = useRouter();
    // NOTE: We add a state boolean variable to see if we are in edit mode or just displaying
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const { posts, userName, removePost } = usePostContext();    
    const postList = posts.filter((post: any) => post.id === postId );
    if (postList.length === 0) {
        notFound();
    }
    const post = postList[0]
    const deletePost = () => {
        removePost(postId);
        router.back();
    }

    // NOTE: When edition selected, we change the state flag
    const setEditable = () => {
        setIsEditing(true);
    }

    const goBack = () => {
        router.back();
    }

    const cancelEdit = () => {
        setIsEditing(false);
    }

    return (
        <>
        { isEditing ? (
                <EditPost userName={userName} id={post.id} title={post.title} content={post.content} onCancel={cancelEdit}/>
            ) :( 
                <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
                    <button onClick={goBack} className={buttonStyle}> Back </button>
                    <article className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
                        {/* Post Title */}
                        <h1 className="text-5xl font-extrabold text-gray-900 mb-4"> {post.title} </h1>
                        {/* Author Information */}
                        <p className="text-lg text-gray-600 mb-4">
                            by <span className="font-medium text-gray-800">{post.author?.name || "Anonymous"}</span>
                        </p>
                        {/* Content Section */}
                        <div className="text-lg text-gray-800 leading-relaxed space-y-6 border-t pt-6">
                        {post.content ? (
                            <p>{post.content}</p>
                        ) : (
                            <p className="italic text-gray-500">No content available for this post.</p>
                        )}
                        </div>
                    </article>
                    {/* Delete Button */}
                    <form action={deletePost} className="mt-6">
                        {/* NOTE: In case the current user is the author of the post, he can edit  */}
                        {post.author?.name === userName && <button onClick={setEditable} className={buttonStyle}> Edit Post </button> }
                        <span className="mr-20"></span>
                        <button type="submit" className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors">
                            Delete Post
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}
