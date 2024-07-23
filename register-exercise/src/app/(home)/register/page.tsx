"use client";
import { onRegister } from "@/app/action";
import { UserInput } from "@/app/type";
import Link from "next/link";
import { useRef } from "react";
import { toast } from "react-toastify";
export default function Login() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passRef = useRef<HTMLInputElement | null>(null);

  const handleRegister = async () => {
    try {
      const data: UserInput = {
        username: usernameRef.current?.value || "",
        email: emailRef.current?.value || "",
        password: passRef.current?.value || "",
      };

      const { result } = await onRegister(data);
      console.log(result);

      if (usernameRef.current && emailRef.current && passRef.current) {
        usernameRef.current.value = "";
        emailRef.current.value = "";
        passRef.current.value = "";
      }
      toast.success(result.msg)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center min-h-screen items-center">
      <div className="flex rounded-xl flex-col justify-center items-center bg-white px-10 p-5 text-black">
        <h1 className="my-5 mb-10 font-bold text-3xl">Register</h1>
        <input
          type="text"
          ref={usernameRef}
          placeholder="your username"
          className="bg-white border-b-2 w-[300px] px-2 py-1"
        />
        <input
          type="text"
          ref={emailRef}
          placeholder="your email"
          className="bg-white border-b-2 w-[300px] px-2 my-5 py-1"
        />
        <input
          type="password"
          ref={passRef}
          placeholder="your password"
          className="bg-white border-b-2 w-[300px] mb-5 px-2 py-bluebg-blue-500   mx-5 py-2  d-lg"
        />
        <button
          onClick={handleRegister}
          className="bg-blue-500 px-5 font-semibold w-[200px]  py-2 rounded-lg my-5 "
        >
          Register
        </button>
        <Link href="/">Back</Link>
      </div>
    </div>
  );
}
