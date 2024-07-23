"use client";
import { videoUrlPath } from "@/app/config/url.const";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useRef, useState } from "react";
import Cookies from "js-cookie";

const uploadVideo = () => {
  const formDataRef = useRef(new FormData());
  const accessToken = Cookies.get("accessToken");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    formDataRef.current.set(name, value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      formDataRef.current.set(name, files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(formDataRef.current);
    e.preventDefault();
    const res = await fetch(videoUrlPath.publishAVideo, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formDataRef.current,
    });

    if (!res.ok) {
      console.error("Error:", res.statusText);
    }

    return res.json();
  };
  return (
    <div className="w-full flex flex-row absolute mt-14 justify-center h-screen">
      <Card className="max-w-md m-5">
        <CardHeader>
          <CardTitle>Upload a Video</CardTitle>
          <CardDescription>
            Add your video and thumbnail to start sharing with your audience.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-4"
            onSubmit={onSubmit}
            method="POST"
            action="#"
          >
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                name="title"
                id="title"
                placeholder="Enter a title for your video"
                type="text"
                onChange={handleTextChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                name="description"
                id="description"
                placeholder="Provide a description for your video"
                className="min-h-[80px]"
                onChange={handleTextChange}
                type="text"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="video">Video File</Label>
              <Input
                name="videoFile"
                id="videoFile"
                type="file"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail</Label>
              <Input
                name="thumbnail"
                id="thumbnail"
                type="file"
                onChange={handleFileChange}
                required
              />
            </div>

            <Button type="submit">Upload Video</Button>
          </form>
        </CardContent>
        {/* <CardFooter className="flex justify-end">
          <Button type="submit">Upload Video</Button>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default uploadVideo;
