"use client";
import { useRef } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { onLogin } from "../action";

export default function Home() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);
  const handleLogin = async () => {
    try {
      const email = emailRef.current?.value || "";
      const password = passRef.current?.value || "";

      const { result, ok } = await onLogin(email, password);
      console.log(result, ok);

      if (!ok) throw result.msg || "error fetch";
      if (emailRef.current && passRef.current) {
        emailRef.current.value = "";
        passRef.current.value = "";
      }
      toast.success(result.msg);
    } catch (err) {
      toast.error(err as string);
    }
  };
  return (
    <div className="flex justify-center max-h-screen my-[130px] items-center">
      <div className="flex rounded-xl flex-col justify-center items-center bg-white px-10 p-5 text-black">
        <h1 className="my-5 mb-10 font-bold text-3xl">Log in</h1>
        <input
          ref={emailRef}
          type="text"
          placeholder="your username"
          className="bg-white border-b-2 w-[300px] px-2 py-1"
        />
        <input
          type="password"
          ref={passRef}
          placeholder="your password"
          className="bg-white border-b-2 w-[300px] my-5 px-2 py-bluebg-blue-500   mx-5 py-2  d-lg"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 px-5 font-semibold w-[200px]  py-2 rounded-lg my-5 "
        >
          Log in
        </button>
        <Link href="/register">Register</Link>
      </div>
    </div>
  );
}
