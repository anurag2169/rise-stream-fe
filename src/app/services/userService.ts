import { urlPath, videoUrlPath } from "../config/url.const";
import Cookies from "js-cookie";

export const changeUserPassword = async ({ content }: any) => {
  const accessToken = Cookies.get("accessToken");
  try {
    const res = await fetch(`${urlPath.changeUserPassword}`, {
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
    console.error("Failed to change User Password:", error);
    throw error;
  }
};

export const getUserChannelProfile = async (username: string) => {
  const accessToken = Cookies.get("accessToken");

  try {
    const res = await fetch(`${urlPath.getUserChannelProfile}${username}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      console.error("Failed to fetch User channel");
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch User channel:", error);
    throw error;
  }
};

export const getUserChannelVideos = async (userId: any) => {
  const accessToken = Cookies.get("accessToken");
  try {
    const res = await fetch(`${videoUrlPath.getUserAllVideos}${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      console.error("Failed to fetch User channel videos");
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch User channel videos");
  }
};
