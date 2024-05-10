"use client";
import { useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const emailRef = useRef();

  const submitter = (e) => {
    e.preventDefault();
    toast.info("please wait");
    const formData = {
      email: emailRef.current.value,
    };

    const goal_url = "";
    axios
      .post(goal_url, formData)
      .then((d) => {
        console.log(d.data);
        toast.success("successful");
      })
      .catch((err) => {
        console.log(err);
        toast.error("error");
      });
  };

  return (
    <div className="container mx-auto flex flex-col gap-12 p-8">
      <h1 className="font-bold text-2xl">Reset Password Page</h1>
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

        <button
          className="p-4 rounded-md bg-blue-400 hover:bg-blue-600 transition-all duration-500"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
