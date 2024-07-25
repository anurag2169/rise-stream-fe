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

  /* GET */
  getUserChannelProfile: DOMAIN + "users/c/:username",

  /* GET */
  getUserWatchHistory: DOMAIN + "users/history",

  /* POST */
  addUserWatchHistory: DOMAIN + "users/addWatchHistory/:videoId",
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

  /* GET */
  getUserAllVideos: DOMAIN + "videos/userVideos/:userId",
};

export const playlistUrlPath = {
  /* POST */
  createPlaylist: DOMAIN + "playlist/",

  /* GET */
  getPlaylistById: DOMAIN + "playlist/:playlistId",

  /* PATCH */
  updatePlaylist: DOMAIN + "playlist/:playlistId",

  /* DELETE */
  deletePlaylist: DOMAIN + "playlist/:playlistId",

  /* PATCH */
  addVideoToPlaylist: DOMAIN + "playlist/add/:videoId/:playlistId",

  /* PATCH */
  removeVideoFromPlaylist: DOMAIN + "playlist/remove/:videoId/:playlistId",

  /* GET */
  getUserPlaylists: DOMAIN + "playlist/user/:userId",
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

  /* POST */
  toggleCommentLike: DOMAIN + "likes/toggle/v/:commentId",

  /* POST */
  toggleTweetLike: DOMAIN + "likes/toggle/v/:tweetId",

  /* GET */
  getLikedVideos: DOMAIN + "likes/toggle/v/:videoId",
};

export const subscriptionsUrlPath = {
  /* GET */
  getUserChannelSubscribers: DOMAIN + "subscriptions/c/:channelId",

  /* POST */
  toggleSubscription: DOMAIN + "subscriptions/c/:channelId",

  /* GET */
  getSubscribedChannels: DOMAIN + "subscriptions/u/:subscriberId",
};

export const dashboardUrlPath = {
  /* GET */
  getChannelStats: DOMAIN + "dashboard/stats",
};
