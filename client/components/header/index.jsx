import Link from "next/link";
import React from "react";

const Header = () => {
  const links = [
    { url: "/", title: "main" },
    { url: "/sign-in", title: "sign in" },
    { url: "/reset-password", title: "reset password" },
    { url: "/new-password", title: "new password" },
    { url: "/add-user", title: "add user" },
  ];
  return (
    <header className="flex justify-start items-center gap-6">
      {links.map((data, index) => (
        <Link
          className="bg-blue-500 text-white hover:bg-blue-600 transition-all duration-500 px-5 py-2 rounded-md"
          key={index}
          href={data.url}
        >
          {data.title}
        </Link>
      ))}
    </header>
  );
};

export default Header;
