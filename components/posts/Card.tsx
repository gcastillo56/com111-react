import Link from "next/link";

export default function Card({ post, userName }: any) {
    const bgColor = post.author.name === userName ? "bg-red-50" : "bg-white";
    const renderIt = "anonymous" !== userName;
    return (
      <div className={`border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ${bgColor}`}>
        { renderIt ? (
            <Link key={post.id} href={`/posts/${post.id}`} className="group">
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
            </Link>
          ):(
            <>
              <h2 className="text-2xl font-semibold text-gray-900 group-hover:underline mb-2">{post.title}</h2>
              <h1>You have no access</h1>
            </>
          )
        }
      </div>
    );
}