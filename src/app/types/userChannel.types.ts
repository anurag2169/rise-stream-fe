export interface channelDetails {
  data: {
    avatar: string;
    channelsSubscribedToCount: number;
    coverImage: string;
    email: string;
    fullName: string;
    isSubscribed: boolean;
    subscribersCount: number;
    username: string;
    _id: string;
  };
}

export interface channelDetailsProps {
  channelDetails: channelDetails | null;
}
