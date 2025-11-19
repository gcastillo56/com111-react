'use client'
import { notFound, useRouter } from "next/navigation";
import { usePostContext } from "@/context/postContext";

export default function Post({ postId }: { postId: number }) {
    const router = useRouter();
    const { posts, removePost } = usePostContext();    
    const postList = posts.filter((post: any) => post.id === postId );
    if (postList.length === 0) {
        notFound();
    }
    const post = postList[0]
    const deletePost = () => {
        removePost(postId);
        router.back();
    }

    const goBack = () => {
        router.back();
    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
            <button onClick={goBack} className="w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out mb-12"> Back </button>
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
                <button type="submit"
                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors">
                    Delete Post
                </button>
            </form>
        </div>
    );
}
