import { DOMAIN } from "@/app/config/url.const";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const subscribedApiSlice = createApi({
  reducerPath: "subscribed",
  baseQuery: fetchBaseQuery({
    baseUrl: DOMAIN,
    prepareHeaders: (headers) => {
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
      headers.set("Content-Type", "application/json");
    },
  }),
  endpoints: (builder) => {
    return {
      getSubscribedChannels: builder.query({
        query: (subscriberId) => `subscriptions/u/${subscriberId}`,
      }),
    };
  },
});

export const { useGetSubscribedChannelsQuery } = subscribedApiSlice;
