"use client";

import Link from "next/link";

export default function Header({ value, action }: any) {
  const add = () => { action(value + 1); };
  
  return (
    <header className="w-full bg-white shadow-md py-4 px-8">
      <nav className="flex justify-between items-center">
        <Link href="/" >UP Blog</Link>  :{value} 
        <div className="flex items-center space-x-4">
          <button onClick={add}>Add</button> 
          <Link href="/posts"> Posts </Link>
          <Link href="/posts/new"> New </Link>
          {/** NOTE: We direct the link to our new login page */}
          <Link href="/login" > Sign In </Link>
        </div>
      </nav>
    </header>
  );
}
