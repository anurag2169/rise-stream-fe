import Cookies from "js-cookie";
import { playlistUrlPath } from "../config/url.const";

const accessToken = Cookies.get("accessToken");

export const getChannelPlaylists = async (ChannelId: any) => {
  try {
    const res = await fetch(`${playlistUrlPath.getUserPlaylists}${ChannelId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      console.error("Failed to fetch User channel Playlists");
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch channel playlists" + error);
  }
};

export const getPlaylistById = async (playlistId: any) => {
  try {
    const res = await fetch(`${playlistUrlPath.getPlaylistById}${playlistId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      console.error("Failed to fetch playlist Details");
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch playlist Details" + error);
  }
};
