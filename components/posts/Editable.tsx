'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { usePostContext } from "@/context/postContext";

// NOTE: We transform this component to be capable of receiving the information from the parent to 
// reuse it for creation or edition.
export default function EditPost(
    {userName, id = -1, title = '', content = '', onCancel } : 
    { userName: string, id?: number, title?: string, content?: string, onCancel?: CallableFunction }
) {
    //NOTE: Just for visibility purposes, I create this variable for the button styles
    const buttonStyle = "w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out";
    const { addUpdatePost } = usePostContext();
    const router = useRouter();
    const [postContent, setPostContent] = useState({ 'id': id, 'title': title, 'author': userName, 'content': content });

    const fieldChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        const key = e.target.name;
        setPostContent({ ...postContent, [key] : e.target.value });
    }

    const submitForm = (e: any) => {
        e.preventDefault();
        if(postContent.author == "") {
            alert("You need an author");
            return;
        }
        addUpdatePost(postContent);
        setPostContent({'id': -1,  'title': '', 'author': '', 'content': '' });
        router.push('/posts');   // NOTE: we could as well use the redirect("/posts") method from next/navigation
    }

    // NOTE: If the user wants to cancel the edition, we just go back
    const cancelEdit = (e: any) => {
        // NOTE: Even though we are not submitting the form, if we don't execute this instruction, 
        // the submission of the form will continue and will be sent to the backend.
        e.preventDefault();
        onCancel && onCancel();
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start p-8 ">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                {/* If we have a default id, we will show that we are creating, else editing mode */}
                {id === -1 ? <>Create New Post</> : <>Edit Post</> }
            </h2>
            <form onSubmit={submitForm}>
                <div className="mb-6">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Post Title</label>
                    <input type="text" id="title" name="title" required
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out sm:text-base"
                        placeholder="A catchy title for your post"
                        onChange={fieldChange}
                        value={postContent.title}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">Author's Name</label>
                    <input type="text" id="author" name="author" 
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out sm:text-base"
                        onChange={fieldChange}
                        value={postContent.author}
                        placeholder="Your name"
                        />
                </div>
                <div className="mb-8">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <textarea id="content" name="content" rows={10} cols={60} required
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out sm:text-base"
                            onChange={fieldChange}
                            value={postContent.content}
                            placeholder="Write your post content here..."></textarea>
                </div>
                <div className="flex justify-end">
                    {/* If we have a default id, we will allow canceling the action and go back */}
                    {id !== -1 && <button onClick={cancelEdit} className={buttonStyle}> Cancel </button> }
                    <span className="mr-20"></span>
                    <button type="submit" className={buttonStyle}>
                        {/* If we have a default id, we will show that we are creating, else editing mode */}
                        {id === -1 ? <>Publish Post</> : <>Update Post</> }
                    </button>
                </div>

            </form>
        </div>
    );
}
