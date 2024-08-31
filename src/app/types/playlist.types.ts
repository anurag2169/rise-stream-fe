export interface Owner {
  _id: string;
  fullName: string;
  avatar: string;
  email: string;
  username: string;
}

export interface Video {
  _id: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: number;
  views: number;
  isPublished: boolean;
  owner: Owner;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export interface PlaylistTypes {
  _id: string;
  name: string;
  description: string;
  owner: Owner;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  videos: Video[];
}

export interface playListVideoProps {
  videoDetails?: Video;
}
