"use client";

import Link from "next/link";
import { usePostContext } from "@/context/postContext";

export default function Header({ value, action }: any) {
  const { userName, setUser } = usePostContext();

  const add = () => { action(value + 1); };
  const logout = () => { setUser('') };
  
  return (
    <header className="w-full bg-white shadow-md py-4 px-8">
      <nav className="flex justify-between items-center">
        <Link href="/" >UP Blog</Link>   
        {/** NOTE: Removed counter 
        <div className="flex items-center space-x-4">
          <button onClick={add} 
            className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-15 mr-3"
                  >Add</button>{`=> ${value}`}
        </div>
        */}
        <div className="flex items-center space-x-4">
          {/** NOTE: If we have a name, we will greet the user */}
          {userName !== '' && 
            (<div className="text-sm text-gray-500">
              <div>{`  Welcome ${userName}`}</div>

            </div>)
          }
          <Link href="/posts"> Posts </Link>
          <Link href="/posts/new"> New </Link>
          { userName === '' ? (
            <>
              {/** NOTE: We direct the link to our new login page */}
              <Link href="/login" > Sign In </Link>
            </>
            ) : (
            <>
              {/** NOTE: If we already have a value, then we will change the link name. */}
              <button onClick={logout} className="cursor-pointer"> Logout </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
