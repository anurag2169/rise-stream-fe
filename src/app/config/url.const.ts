import { Domain } from "domain";

const DOMAIN = "http://localhost:8000/api/v1/";

export const urlPath = {
  /* POST */
  registerUser: DOMAIN + "users/register",

  /* POST */
  signInUser: DOMAIN + "users/login",

  /* POST */
  signOutUser: DOMAIN + "users/logout",

  /* POST */
  changeUserPassword: DOMAIN + "users/change-password",

  /* GET */
  getCurrentUser: DOMAIN + "users/current-user",

  /* PATCH */
  updateUserAccount: DOMAIN + "users/update-account",

  /* PATCH */
  updateUserAvatar: DOMAIN + "users/avatar",

  /* PATCH */
  updateUserCoverImage: DOMAIN + "users/cover-image",

  /* GET :username */
  getUserChannelProfile: DOMAIN + "users/c/",

  /* GET */
  getUserWatchHistory: DOMAIN + "users/history",

  /* POST :videoId */
  addUserWatchHistory: DOMAIN + "users/addWatchHistory/",
};

export const videoUrlPath = {
  /* GET */
  getAllVideos: DOMAIN + "videos/",

  /* POST */
  publishAVideo: DOMAIN + "videos/",

  /* GET */
  getVideoById: DOMAIN + "videos/",

  /* DELETE */
  deleteVideo: DOMAIN + "videos/:videoId",

  /* PATCH */
  updateVideo: DOMAIN + "videos/:videoId",

  /* patch */
  togglePublishStatus: DOMAIN + "videos/toggle/publish/:videoId",

  /* GET :userId */
  getUserAllVideos: DOMAIN + "videos/userVideos/",
};

export const playlistUrlPath = {
  /* POST */
  createPlaylist: DOMAIN + "playlist/",

  /* GET :playlistId */
  getPlaylistById: DOMAIN + "playlist/",

  /* PATCH */
  updatePlaylist: DOMAIN + "playlist/:playlistId",

  /* DELETE */
  deletePlaylist: DOMAIN + "playlist/:playlistId",

  /* PATCH */
  addVideoToPlaylist: DOMAIN + "playlist/add/:videoId/:playlistId",

  /* PATCH */
  removeVideoFromPlaylist: DOMAIN + "playlist/remove/:videoId/:playlistId",

  /* GET :userId */
  getUserPlaylists: DOMAIN + "playlist/user/",
};

export const commentUrlPath = {
  /* GET  :videoId*/
  getVideoComments: DOMAIN + "comments/",

  /* POST :videoId */
  addComment: DOMAIN + "comments/",

  /* DELETE :commentId */
  deleteComment: DOMAIN + "comments/c/",

  /* PATCH :commentId */
  updateComment: DOMAIN + "comments/c/",
};

export const likesUrlPath = {
  /* POST */
  toggleVideoLike: DOMAIN + "likes/toggle/v/:videoId",

  /* POST :commentId */
  toggleCommentLike: DOMAIN + "likes/toggle/c/",

  /* POST */
  toggleTweetLike: DOMAIN + "likes/toggle/v/:tweetId",

  /* GET */
  getLikedVideos: DOMAIN + "likes/toggle/v/:videoId",
};

export const subscriptionsUrlPath = {
  /* GET :channelId */
  getUserChannelSubscribers: DOMAIN + "subscriptions/c/",

  /* POST :channelId*/
  toggleSubscription: DOMAIN + "subscriptions/c/",

  /* GET  :subscriberId*/
  getSubscribedChannels: DOMAIN + "subscriptions/u/",
};

export const dashboardUrlPath = {
  /* GET */
  getChannelStats: DOMAIN + "dashboard/stats",
};

export const searchUrlPath = {
  // GET

  getSeachData: DOMAIN + "search?query=",
};
