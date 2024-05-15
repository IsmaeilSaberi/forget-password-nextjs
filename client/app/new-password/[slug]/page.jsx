"use client";
import { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const NewPasswordPage = ({ params }) => {
  const passwordRef = useRef();
  const repasswordRef = useRef();

  const submitter = (e) => {
    e.preventDefault();
    toast.info("please wait");
    const formData = {
      password: passwordRef.current.value,
      repassword: repasswordRef.current.value,
      token: params.slug,
    };

    const goal_url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/new-password`;
    axios
      .post(goal_url, formData)
      .then((d) => {
        toast.success(d.data.message);
      })
      .catch((err) => {
        const message = err.response
          ? err.response.data.message
          : "some errors occured!";
        toast.error(message);
      });
  };

  return (
    <div className="container mx-auto flex flex-col gap-12 p-8">
      <h1 className="font-bold text-2xl">New Password Page</h1>
      <form onSubmit={submitter} className="flex flex-col gap-6 text-black">
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
        <div className="flex flex-col gap-2 ">
          <label className="text-xl font-bold" htmlFor="goal_repassword">
            Confirm Password
          </label>
          <input
            required
            type="text"
            ref={repasswordRef}
            className="p-4 rounded-md outline-none border-2 border-zinc-200 focus:border-blue-500 transition-all duration-500"
            name="goal_repassword"
            id="goal_repassword"
            placeholder="**********"
          />
        </div>

        <button
          className="p-4 rounded-md bg-blue-400 hover:bg-blue-600 transition-all duration-500"
          type="submit"
        >
          Change My Password
        </button>
      </form>
    </div>
  );
};

export default NewPasswordPage;
