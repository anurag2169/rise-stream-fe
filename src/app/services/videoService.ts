// services/videoService.ts
import { commentUrlPath, videoUrlPath } from "@/app/config/url.const";
import Cookies from "js-cookie";

export const getVideo = async (videoid: string) => {
  const accessToken = Cookies.get("accessToken");
  try {
    const res = await fetch(`${videoUrlPath.getVideoById}${videoid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    return data.data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCommentsOnVideo = async (videoid: string) => {
  const accessToken = Cookies.get("accessToken");
  try {
    const res = await fetch(`${commentUrlPath.getVideoComments}${videoid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    return data.data.reverse();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addComment = async (videoid: string, content: any) => {
  const accessToken = Cookies.get("accessToken");
  try {
    const res = await fetch(`${commentUrlPath.addComment}${videoid}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to add comment:", error);
    throw error;
  }
};

export const editComment = async (commentId: string, editedContent: any) => {
  const accessToken = Cookies.get("accessToken");
  try {
    const res = await fetch(`${commentUrlPath.updateComment}${commentId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ content: editedContent }),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to edit comment:", error);
    throw error;
  }
};
