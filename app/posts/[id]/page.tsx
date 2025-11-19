'use server'
import Post from "@/components/posts/Post";

export default async function PostView({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const postId = parseInt(id);
    return <Post postId={postId} />
}
