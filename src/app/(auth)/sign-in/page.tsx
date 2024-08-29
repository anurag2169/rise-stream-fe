"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
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
import { urlPath } from "@/app/config/url.const";
import { loginUser, selectUserState } from "@/app/lib/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/lib/store";
import { BackgroundBeams } from "@/components/ui/background-beams";

const SignInForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const userState = useSelector(selectUserState);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (userState.status === "succeeded" && userState.data) {;
      const { accessToken, refreshToken } = userState.data.data;

      // Set tokens in cookies
      Cookies.set("accessToken", accessToken, {
        secure: true,
        sameSite: "None",
      });
      Cookies.set("refreshToken", refreshToken, {
        secure: true,
        sameSite: "None",
      });

      // Redirect to home page
      router.push("/home");
    }
  }, [userState, router]);
  return (
    <>
      <BackgroundBeams />
      <div className="relative flex justify-center items-center h-screen">
        <Card className="mx-auto max-w-sm ">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action="#" method="POST" onSubmit={onSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email or Username</Label>
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    placeholder="Email address or Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default SignInForm;
