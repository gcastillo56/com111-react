'use server'
// NOTE: We get the client component for the detailed view for each post
import DetailPost from "@/components/DetailPost";

// NOTE: Since we are getting the param from the url, we have to make this component async, thus
// a server component. But in a server component we can not access the context, since that is
// reserved only for client components. Thus, we will break this component into a server part
// that later invokes a client side.
export default async function Post({ params }: { params: Promise<{ id: string }> }) {
    // NOTE: Since we are inside a parametrized route, we get the param from the route
    const { id } = await params;
    const postId = parseInt(id);
    // NOTE: We invoke the client component.
    return <DetailPost postId={postId} />
}
