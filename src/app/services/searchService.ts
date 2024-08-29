import Cookies from "js-cookie";
import { searchUrlPath } from "../config/url.const";

const accessToken = Cookies.get("accessToken");

export const getsearchDetails = async (query: any) => {
  try {
    const formattedQuery = query.split(" ").join("+");
    const res = await fetch(`${searchUrlPath.getSeachData}${formattedQuery}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      console.error("search Api Failed");
    }
    return await res.json();
  } catch (error) {
    console.error("search Failed" + error);
  }
};
