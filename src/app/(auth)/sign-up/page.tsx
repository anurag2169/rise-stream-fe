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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BackgroundBeams } from "@/components/ui/background-beams";

const SignUpForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
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
  }, [state.status, router]);

  return (
    <>
      <BackgroundBeams />

      <div className="relative flex justify-center items-center h-screen">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action="#" method="POST" onSubmit={onSubmit}>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="Full Name"
                      onChange={handleTextChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      placeholder="Username"
                      onChange={handleTextChange}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="Email address"
                    onChange={handleTextChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Password"
                    onChange={handleTextChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="avatar">Avatar</Label>
                    <Input
                      id="avatar"
                      name="avatar"
                      type="file"
                      required
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="coverImage">Cover Image</Label>
                    <Input
                      id="coverImage"
                      name="coverImage"
                      type="file"
                      required
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Create an account
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/sign-in" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SignUpForm;
