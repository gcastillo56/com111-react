"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { loginAction } from "@/api/api";
import { usePostContext } from "@/context/postContext";

// NOTE: We create a controlled component to deal with the login information
export default function Login() {
    const router = useRouter();
    const [loginCredentials, setLoginCredentials] = useState({ 'email': '', 'password': '' });
    const [error, setError] = useState<string | null>(null);
    const { addUpdatePost } = usePostContext();

    const fieldChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        setLoginCredentials({ ...loginCredentials, [e.target.name] : e.target.value });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            // TODO: If we wanted to use nextauth, here is where we would do it
            // For now we will use an in house solution with our backend
            // const response = await signIn("credentials", {
            //     ...loginCredentials,
            //     redirect: false,
            // });
            const response = await loginAction(loginCredentials);
            if (response?.error) {
                setError("Invalid credentials");
                return;
            }
            // NOTE: register our name into the context
            addUpdatePost(response.name);
            alert(`Welcome ${response.name}`)
            router.push("/");
            router.refresh();
        } catch {
            setError("An error occurred during login");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
            </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                <label htmlFor="email" className="sr-only">
                    Email address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    onChange={fieldChange}
                    value={loginCredentials.email}
                />
                </div>
                <div>
                <label htmlFor="password" className="sr-only">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    onChange={fieldChange}
                    value={loginCredentials.password}
                />
                </div>
            </div>

            {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div>
                <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                Sign in
                </button>
            </div>
            </form>
            <div className="text-center">
            <Link href="/register" className="text-blue-600 hover:underline">
                No account? Register.
            </Link>
            </div>
        </div>
        </div>
    );
}
