import { DOMAIN, urlPath } from "@/app/config/url.const";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const videoApiSlice = createApi({
  reducerPath: "videos",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://rise-stream-backend.vercel.app/api/v1/",
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      getVideos: builder.query({
        query: () => "videos/",
      }),

      getVideoById: builder.query({
        query: (videoId) => `videos/${videoId}`,
      }),

      getUserWatchHistory: builder.query({
        query: () => `${urlPath.getUserWatchHistory}`,
      }),
    };
  },
});

export const {
  useGetVideosQuery,
  useGetVideoByIdQuery,
  useGetUserWatchHistoryQuery,
} = videoApiSlice;
