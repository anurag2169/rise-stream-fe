import Cookies from "js-cookie";
import { subscriptionsUrlPath } from "../config/url.const";

const accessToken = Cookies.get("accessToken");

export const toggleSubscription = async (channelId: any) => {
  try {
    const res = await fetch(
      `${subscriptionsUrlPath.toggleSubscription}${channelId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (!res.ok) {
      console.error("Failed to toggle user subscription");
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to toggle user subscription" + error);
  }
};
