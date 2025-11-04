"use client";

export default function Header() {

  return (
    <header className="w-full bg-white shadow-md py-4 px-8">
      <nav className="flex justify-between items-center">
          UP Blog
        <div className="flex items-center space-x-4">
          <a href="/">
            Posts
          </a>
            <a href="/" >
              Sign In
            </a>
        </div>
      </nav>
    </header>
  );
}
