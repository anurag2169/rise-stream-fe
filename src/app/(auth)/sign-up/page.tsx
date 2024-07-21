"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  registerUser,
  selectUserState,
} from "../../lib/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/lib/store";

const SignUpForm = () => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  // const state = useSelector((state: RootState) => state);
  const state = useSelector(selectUserState);
  const [formData, setFormData] = useState<FormData>(new FormData());

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formData.set(name, value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      formData.set(name, files[0]);
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (state.status === "succeeded") {
      router.push("/sign-in");
    }
  }, [state.status]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols h-screen">
      <div className=" flex flex-col justify-center items-center">
        <div className="max-w-md w-full ">
          <div>
            <img
              src="/logo.png"
              alt="Rise Stream"
              width={200}
              height={50}
              className="mx-auto"
            />
            <h2 className=" text-center text-3xl font-extrabold text-primary-foreground">
              Welcome to Rise Stream
            </h2>
            <p className="mt-2 text-center text-sm text-primary-foreground">
              The ultimate video streaming platform
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={onSubmit}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm space-y-2">
              <div>
                <label htmlFor="fullName" className="sr-only">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  onChange={handleTextChange}
                />
              </div>
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Username"
                  onChange={handleTextChange}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={handleTextChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={handleTextChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="avatar" className="sr-only">
                  Avatar
                </label>
                <input
                  id="avatar"
                  name="avatar"
                  type="file"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  onChange={handleFileChange}
                />
              </div>
              <div>
                <label htmlFor="coverImage" className="sr-only">
                  Cover Image
                </label>
                <input
                  id="coverImage"
                  name="coverImage"
                  type="file"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border  text-sm font-medium rounded-md shadow-sm text-black bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockIcon className="h-5 w-5 text-primary-light group-hover:text-primary-foreground" />
                </span>
                Register
              </button>
            </div>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link
                href="/sign-in"
                className="font-medium text-primary hover:text-primary-dark"
                prefetch={false}
              >
                login to account?
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

function LockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default SignUpForm;
