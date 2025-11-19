'use client';
import EditPost from "@/components/posts/Editable";
import { usePostContext } from "@/context/postContext";

export default function NewPost() {
    // NOTE: With the new reusable component, we have to pass the userName
    const { userName } = usePostContext();
    return <EditPost userName={userName} />
}
