"use client";
import { useRef } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

const SignInPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitter = (e) => {
    e.preventDefault();
    toast.info("please wait");
    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
  };

  return (
    <div className="container mx-auto flex flex-col gap-12 p-8">
      <h1 className="font-bold text-2xl">Sign In Page</h1>
      <form onSubmit={submitter} className="flex flex-col gap-6 text-black">
        <div className="flex flex-col gap-2">
          <label className="text-xl font-bold" htmlFor="goal_email">
            Email
          </label>
          <input
            required
            type="email"
            ref={emailRef}
            className="p-4 rounded-md outline-none border-2 border-zinc-200 focus:border-blue-500 transition-all duration-500"
            name="goal_email"
            id="goal_email"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <label className="text-xl font-bold" htmlFor="goal_password">
            Password
          </label>
          <input
            required
            type="text"
            ref={passwordRef}
            className="p-4 rounded-md outline-none border-2 border-zinc-200 focus:border-blue-500 transition-all duration-500"
            name="goal_password"
            id="goal_password"
            placeholder="**********"
          />
        </div>
        <button
          className="p-4 rounded-md bg-blue-400 hover:bg-blue-600 transition-all duration-500"
          type="submit"
        >
          Sign In
        </button>
        <Link
          className="text-zinc-300 underline font-bold text-center hover:text-zinc-400"
          href={"/reset-password"}
        >
          Forget Password
        </Link>
      </form>
    </div>
  );
};

export default SignInPage;
