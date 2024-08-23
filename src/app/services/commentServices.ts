import { commentUrlPath, likesUrlPath, videoUrlPath } from "@/app/config/url.const";
import Cookies from "js-cookie";

export const deleteComment = async (commentId: string) => {
  const accessToken = Cookies.get("accessToken");
  try {
    const res = await fetch(`${commentUrlPath.deleteComment}${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to delete comment:", error);
    throw error;
  }
};
export const toggleCommentLike = async (commentId: string) => {
  const accessToken = Cookies.get("accessToken");
  try {
    const res = await fetch(`${likesUrlPath.toggleCommentLike}${commentId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to Like comment:", error);
    throw error;
  }
};
