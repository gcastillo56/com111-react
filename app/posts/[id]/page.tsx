'use server'
// NOTE: We add the detailed view for each post
import { notFound, redirect } from "next/navigation";
import { usePostContext } from "@/context/postContext";

// NOTE: Since we are getting the param from the url, we have to make this component async, thus
// a server component. But in a server component we can not access the context, since that is
// reserved only for client components. Thus, we will break this component into a server part
// that later invokes a client side.
export default async function Post({ params }: { params: Promise<{ id: string }> }) {
    // NOTE: Since we are inside a parametrized route, we get the param from the route
    const { id } = await params;
    const postId = parseInt(id);
    // NOTE: We get the required data from the context
    const { posts } = usePostContext();     // FIX-IT 
    const post = posts.filter((post: any) => post.id === postId );

    if (!post) {
        notFound();
    }

    // NOTE: Server action to delete the post. We will implement later
    async function deletePost() {
        alert("delete post")
        redirect("/posts");
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
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
            <button
            type="submit"
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
            >
            Delete Post
            </button>
        </form>
        </div>
    );
}
