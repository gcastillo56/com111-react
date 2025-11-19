import axios from "axios";

const API_ROOT = "http://localhost:5000"

const myAPI = axios.create({
    baseURL: API_ROOT,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
    },
});

const fetchPosts = async () => {
    console.log("Pinging the backend");
    try {
        const res = await myAPI.get(`/api/posts`);
        console.log("Response from backend:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error pinging backend:", error);
        return [{ "id": 0,
            "title": "No Posts",
            "author": { "name" : "" },
            "createdAt": "2025-11-04 12:00:00",
            "content": "No posts available at the moment."
        }];
    }
}

const addPosts = async (newPost: any) => {
    console.log("Adding post in the backend");
    try {
        const res = await myAPI.post(`/api/posts/new`, { ...newPost } );
        console.log("Response from backend:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error pinging backend:", error);
        return [{ "id": 0,
            "title": "No Posts",
            "author": { "name" : "" },
            "createdAt": "2025-11-04 12:00:00",
            "content": "No posts available at the moment."
        }];
    }
}

const deletePost = async (postId: any) => {
    console.log("Removing post in the backend");
    try {
        const res = await myAPI.delete(`/api/posts/${postId}` );
        console.log("Response from backend:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error pinging backend:", error);
        return [{ "id": 0,
            "title": "No Posts",
            "author": { "name" : "" },
            "createdAt": "2025-11-04 12:00:00",
            "content": "No posts available at the moment."
        }];
    }
}

const pingBackend = async () => {
    console.log("Pinging the backend");
    try {
        const res = await myAPI.get(`/api/ping`);
        console.log("Response from backend:", res.data);
        return res.data;
    } catch (error) {
        console.error("Error pinging backend:", error);
        throw error;
    }
}

export { fetchPosts, pingBackend, addPosts, deletePost }