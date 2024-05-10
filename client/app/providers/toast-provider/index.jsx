"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider = ({ children }) => {
  return (
    <div>
      {children}
      <ToastContainer className={"flex items-center gap-2"} />
    </div>
  );
};

export default ToastProvider;
