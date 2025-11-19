import Link from 'next/link';

function PostListItem({post}: any) {
    return(
        <li key={post.id} className="border p-6 rounded-lg shadow-md bg-white">
            <Link href={`/posts/${post.id}`} className="text-2xl font-semibold text-gray-900 hover:underline">
            {post.title}
            </Link>
            <p className="text-sm text-gray-500">by {post.author?.name || "Anonymous"}</p>
            <p className="text-xs text-gray-400">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })}
            </p>
        </li>
    );
}

export default PostListItem;