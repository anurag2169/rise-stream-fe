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
import React, { Suspense, useRef, useState } from "react";
import Cookies from "js-cookie";

const uploadVideo = () => {
  const formDataRef = useRef(new FormData());
  const accessToken = Cookies.get("accessToken");

  const [loading, setLoading] = useState(false);

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

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(videoUrlPath.publishAVideo, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formDataRef.current,
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data = await res.json();
      setPopupMessage("Video Uplpoaded successful!");
      setShowPopup(true);
      setLoading(false);
      return data;
    } catch (error) {
      // console.error("Error:", error.message);
      setPopupMessage(`Failed to upload the video`);
      setShowPopup(true);
      setLoading(false);
    }
  };
  return (
    <>
      <Suspense fallback={<p>Loading feed...</p>}>
        <div className="w-full flex flex-row absolute mt-14 justify-center h-screen">
          <Card className="max-w-md m-5">
            <CardHeader>
              <CardTitle>Upload a Video</CardTitle>
              <CardDescription>
                Add your video and thumbnail to start sharing with your
                audience.
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

        {loading && (
          <div>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="animate-spin">
                <svg
                  className="h-12 w-12 fill-primary"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8Z" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
      </Suspense>
    </>
  );
};

export default uploadVideo;

const Popup = ({ message, onClose }: any) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-4 rounded">
      <p>{message}</p>
      <button
        onClick={onClose}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Close
      </button>
    </div>
  </div>
);
