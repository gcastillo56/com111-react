'use client';
import { useState } from "react";

function NewPost() {
    const [postContent, setPostContent] = useState({ 'title': '', 'author': '', 'content': '' });

    const fieldChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        console.log("Title changed:", e.target.value);
        const key = e.target.name
        setPostContent({ ...postContent, [key] : e.target.value });
        console.log(postContent)
    }

    const submitForm = (e: any) => {
        e.preventDefault();
        if(postContent.author == "") {
            alert("You need an author");
            return;
        }
        alert("Form submitted");
        setPostContent({ 'title': '', 'author': '', 'content': '' });
    }

    return (
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Create New Post</h2>
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
                    <textarea id="content" name="content" rows={10} required
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out sm:text-base"
                            onChange={fieldChange}
                            value={postContent.content}
                            placeholder="Write your post content here..."></textarea>
                </div>

                <div className="flex justify-end">
                    <button type="submit"
                            className="w-full sm:w-auto px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
                        Publish Post
                    </button>
                </div>

            </form>
        </div>
    );
}

export default NewPost;